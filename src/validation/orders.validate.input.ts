import { Request , Response , NextFunction } from "express";

export default async function idValidation (req : Request , res : Response , next : NextFunction) : Promise<void> {

    if ( ! parseInt(  req.params.id ) ){
        res.status(400).send('Bad request id is invalide'); 
        return;
    }
    next();
}

 