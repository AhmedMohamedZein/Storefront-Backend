import { Request , Response , NextFunction } from "express";
import client from "../database";
export default async function idValidationPost (req : Request , res : Response , next : NextFunction) : Promise<void> {

    if ( ! parseInt(  req.params.id ) ){
        res.status(400).send('Bad request user_id is invalide or it does not exists').end(); 
        return;
    }
    if ( ! parseInt(  req.params.product_id ) ){
        res.status(400).send('Bad request product_id is invalide or it does not exists').end(); 
        return;
    }
    // check if the product_id exists
    try {
        const conn =  await client.connect();
        const sql = 'SELECT * FROM products WHERE id=$1';
        const productID = await conn.query (sql , [ req.params.product_id ]);
        if (! productID.rows[0].id ){
            res.status(400).send('Bad request product_id is invalide or it does not exists').end(); 
            return;
        }
    }
    catch (error) {
        res.status(500).send('server error bad connection to the database').end(); 
        return;
    }
    next();
}

export async function idValidation(req : Request , res : Response , next : NextFunction) : Promise<void> {
    if ( ! parseInt(  req.params.id ) ){
        res.status(400).send('Bad request user_id is invalide or it does not exists').end(); 
        return;
    }
    next();
}