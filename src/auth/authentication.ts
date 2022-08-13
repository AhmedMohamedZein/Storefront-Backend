import {  Request , Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';
import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { QueryResult } from "pg";
dotenv.config();
export default async function authentication (req : Request , res : Response , next : NextFunction) : Promise<void> {

    // create a token for the user if he exists in the db with his first name and last and password
    try {
        const conn = await client.connect() ;
        // here we should compare the password
        const sql = 'SELECT * FROM users WHERE firstName = $1 AND lastName = $2';
        // Here we check if the user exists in the db
        const user : QueryResult = await client.query (sql, [req.body.firstName , req.body.lastName] );
        conn.release();
        if ( !user ){
            throw new Error ('Bad Request invalide username or password :');
        }
        // Here we check for the comparison of the password
        const result : boolean | Error = await bcryptPassword ( req.body.password , user );
        if (! result ){
            throw new Error ('Bad Request invalide password :');
        }
        const token =  jwt.sign( { firstName : req.body.firstName , lastName : req.body.lastName } , process.env.SECRET as string ) ;
        res.setHeader('authorization' , `Bearer ${token}`);
        res.status(200).send('a token has been sent in the headers').end();
        return;
    }catch (error){
        console.log (` ${error}` );
        res.status(400).json('Bad Request invalide username or password ').end();
        return;
    }
}

async function bcryptPassword( password:string , user : QueryResult ) : Promise<boolean | Error> {
    console.log (user.rows[0].password);
    try {
        const result = await bcrypt.compare (password , user.rows[0].password );
        if ( result ) return true ;
        else 
            return false ;
    }catch (error){
        console.log (` ${error}` );
        return new Error ('bcryptPassword error');
    }
}

