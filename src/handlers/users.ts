import { Application , Request , Response } from "express";
import authorization from "../auth/authorization";
import { Users , usersConnectionDB } from "../modules/users";

const usersHandler = async ( app : Application ) => {
    
    app.get( '/users' , authorization, index);
    app.get('/users/:id'  , show );
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
    // we should make a folder for validation the input data
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
        await user.create( createData .firstName as string , createData.lastName as string , createData.password as string);
        res.status(200).end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
} 


export default usersHandler ;