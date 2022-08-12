import { Application , Request , Response } from "express";
import { Users , usersConnectionDB } from "../modules/users";
import decideMiddleware from '../auth/decideMiddleware';
import firstNameAndlastNameAndPasswordValidation , {idValidation} from '../validation/users.validate.input';
import {Orders , productsOrder} from '../services/productsOrder';
const usersHandler = async ( app : Application ) => {
    // any request to the users/ end point needs to be authenticated 
    app.use ('/users'  , firstNameAndlastNameAndPasswordValidation);
    
    app.get( '/users' , decideMiddleware, index);
    app.get('/users/:id', decideMiddleware , idValidation , show );
    app.get ('/users/:id/orders' , decideMiddleware, idValidation , showOrders);
    app.post('/users' ,create);
}

async function index(req : Request , res : Response ) : Promise<void> {
    try {
        const user = new usersConnectionDB ();
        const responseData = await user.index();
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
}

async function show(req : Request , res : Response ) : Promise<void> {
    const requestData : Users = {
        id : req.params.id
    }
    try {
        const user = new usersConnectionDB ();
        const responseData = await user.show( requestData.id as string);
        res.status(200).json ( responseData ).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }

}

async function create(req : Request , res : Response ) : Promise<void> {
    
    const createData : Users = {
      firstName : req.body.firstName,
      lastName : req.body.lastName,
      password : req.body.password
    }
    try {
        const user = new usersConnectionDB ();
        const token = await user.create( createData .firstName as string , createData.lastName as string , createData.password as string);
        res.status(200).json(token).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
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

export default usersHandler ;