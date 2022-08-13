import { Application , Request , Response } from "express";
import { Users , usersConnectionDB } from "../modules/users";
import decideMiddleware from '../auth/decideMiddleware';
import firstNameAndlastNameAndPasswordValidation , {idValidation} from '../validation/users.validate.input';

const usersHandler = async ( app : Application ) : Promise<void> => {
    // any request to the users/ end point needs to be authenticated 
    app.use ('/users'  , firstNameAndlastNameAndPasswordValidation);
    
    app.get( '/users' , decideMiddleware, index);
    app.get('/users/:id', decideMiddleware , idValidation , show );
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
        res.setHeader('authorization' , `Bearer ${token}`);
        res.status(200).send('a token has been sent in the headers').end();
        return;
    }catch(error){
        res.status(500).json(error).end();
        return;
    }
} 

export default usersHandler ;