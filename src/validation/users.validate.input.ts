import { Request , Response , NextFunction } from "express";

export default async function firstNameAndlastNameAndPasswordValidation (req : Request , res : Response , next : NextFunction) : Promise<void> {
    const authorizationHeader : string | undefined = req.headers['authorization'] ;
    const token = authorizationHeader?.split(' ')[1] ;
    if ( token ) {
        next();
    }
    if ( !req.body.firstName ) {
        res.status(400).send('Bad request firstName is missing'); 
        return;
    }
    if ( !req.body.lastName )  {
        res.status(400).send('Bad request lastName is missing'); 
        return;
    }
    if ( !req.body.password )  {
        res.status(400).send('Bad request password is missing'); 
        return;
    }
    next();
}

export async function idValidation (req : Request , res : Response , next : NextFunction) : Promise<void> {

    if ( ! parseInt(  req.params.id ) ){
        res.status(400).send('Bad request id is invalide'); 
        return;
    }
    next();
}

 