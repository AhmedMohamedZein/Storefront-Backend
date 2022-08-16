import { Application , Request , Response } from "express";
import { Orders , ordersConnnectionDB } from "../modules/orders";
import { productsOrder } from '../services/productsOrder'
import decideMiddleware from '../auth/decideMiddleware';
import idValidationPost , {idValidation} from "../validation/orders.validate.input";

const  ordersHandlers = async ( app : Application ) : Promise<void> => {
    app.get ('/orders' , decideMiddleware, index)
    app.get ('/orders/:id' , decideMiddleware, idValidation , show);
    app.post ('/orders/:id/:product_id' , decideMiddleware , idValidationPost , create );

}

async function index (req : Request , res : Response) : Promise<void> {
    try {
        const Allorder = new ordersConnnectionDB ();
        const responseData = await Allorder.index();
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
}

async function show (req : Request , res : Response) : Promise<void> {
    try {
        const order = new ordersConnnectionDB ();
        const responseData = await order.show( req.params.id );
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
}
    // this route will take a user_id using the body
async function create (req : Request , res : Response) : Promise<void> {
    const requestData : Orders = {
        user_id :  req.params.user_id ,
        product_id : req.params.product_id
    }
    try {
        const order = new productsOrder ();
        await order.create( requestData.user_id as string , req.params.product_id as string);
        res.status(201).json ( { message : 'order has been created '} ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
}

export default ordersHandlers ; 