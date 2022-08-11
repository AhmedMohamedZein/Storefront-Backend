import {  Request , Response , NextFunction} from "express";
import jwt from 'jsonwebtoken';


export default async function authentication (req : Request , res : Response , next : NextFunction) : Promise<void> {

    // check if the request have a token 


}
