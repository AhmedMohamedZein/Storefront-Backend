import {  Request , Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';
import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
export default async function authentication (req : Request , res : Response , next : NextFunction) : Promise<void> {

    // create a token for the user if he exists in the db with his first name and last and password
    try {
        const conn = await client.connect() ;
        // here we should compare the password
        const sql = 'SELECT * FROM users WHERE firstName = $1 AND lastName = $2';
        const user = await client.query (sql, [req.body.firstName , req.body.lastName] );
        conn.release();
        if ( !user ){
            throw new Error ('Bad Request invalide username and password :');
        }
      //  console.log (user.rows[0].password);
      //  console.log (req.body.password );
       // const pass = await bcrypt.hash (req.body.password + process.env.PEPPER , parseInt ( process.env.SALT as string ) );
       
        const result = await bcrypt.compare( process.env.PEPPER as string, user.rows[0].password );
        if (! result ){
            throw new Error ('Bad Request invalide password :');
        }
        const token =  jwt.sign( { firstName : req.body.firstName , lastName : req.body.lastName } , process.env.SECRET as string ) ;
        res.status(200).json(token).end();
        return;
    }catch (error){
        console.log (` ${error}` );
        res.status(400).json('Bad Request invalide username and password ').end();
        return;
    }
}


