import { Application , Request , Response } from "express";
import {Orders , productsOrder} from '../services/productsOrder';
import decideMiddleware from '../auth/decideMiddleware';
import idValidation from "../validation/orders.validate.input";

const  ordersHandlers = async ( app : Application ) : Promise<void> => {

    app.get ('/orders/:id' , decideMiddleware, idValidation , showOrders);

}

async function showOrders (req : Request , res : Response ) : Promise<void> {
    const requestData : Orders = {
        id : req.params.id
    }
    try {
        const order = new productsOrder ();
        const responseData = await order.show( requestData.id as string);
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
 
}


export default ordersHandlers ; 