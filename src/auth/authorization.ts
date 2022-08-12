import {  Request , Response  , NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

export default async function authorization (req : Request , res : Response , next : NextFunction) : Promise<void> {

    // check if the request have a token if not go to the authenticaton
    const authorizationHeader : string | undefined = req.headers['authorization'] ;
    const token = authorizationHeader?.split(' ')[1] ;
    try {
        const payload = await jwt.verify (token as string , process.env.SECRET as string ) ;
        // the token is valid and the user is authorized
        res.locals.payload = payload ;
        next();
    }catch (error) {
        console.log ( `error happend in the authorization function, error : ${error}`);
        res.status(400).json(`${error}`).end();
        return;
    }
}
