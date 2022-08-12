import {  Request , Response  , NextFunction } from "express";
import authorization from "../auth/authorization";
import authentication from "../auth/authentication";
// this function decide whether the request have a token and need to authorize the token, or
// need to create a token "authentication" 
export default async function decideMiddleware (req : Request , res : Response , next : NextFunction ) {

    const authorizationHeader : string | undefined = req.headers['authorization'] ;
    const token = authorizationHeader?.split(' ')[1] ;
    if (  token ){
        return authorization (req , res , next ) ;
    }
    else {
        return authentication (req , res , next );
    }

}
