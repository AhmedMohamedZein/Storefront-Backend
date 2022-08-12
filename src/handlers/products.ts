import { Application , Request , Response } from "express";
import { Product , productsConnectionDB } from "../modules/products";
import { idValidation , nameAndPriceValidation } from "../validation/products.validate.input";
import authorization from '../auth/authorization';
const productHandler = async ( app : Application ) => {
    
    app.get( '/products' , index);
    app.get('/products/:id' , idValidation , show );
    app.post('/products' , authorization ,nameAndPriceValidation ,create);
}
async function index (req : Request , res : Response ) : Promise<void> {
   
    try {
        const product = new productsConnectionDB ();
        const responseData = await product.index();
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
}

async function show(req : Request , res : Response ): Promise<void> {
    
    const requestData : Product = {
        id : req.params.id
    }
    // we should make a folder for validation the input data
    try {
        const product = new productsConnectionDB ();
        const responseData = await product.show( requestData.id as string);
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }

}

async function create ( req : Request , res : Response ) : Promise<void> {
    const requestData : Product = {
        name : req.body.name,
        price : req.body.price
    }
    try {
        const product = new productsConnectionDB ();
        await product.create( requestData.name as string , requestData.price as number );
        res.status(200).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
}

export default  productHandler ;