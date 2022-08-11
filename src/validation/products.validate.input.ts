import { Request , Response , NextFunction } from "express";

function idValidation (req : Request , res : Response , next : NextFunction) : void {
    
    if ( ! parseInt(  req.params.id ) ){
        res.status(400).send('Bad request'); 
        return;
    }
    next();
}

function nameAndPriceValidation (req : Request , res : Response , next : NextFunction) : void {
    
    if ( ! parseInt(  req.body.price ) ) {
        res.status(400).send('Bad request'); 
        return;
    }
    if ( ! req.body.name  )  {
        res.status(400).send('Bad request'); 
        return;
    }
    next();
}

export { idValidation , nameAndPriceValidation } ;