import supertest from "supertest";
import app from '../server';

const response = supertest(app);

describe('Authorization and authentication ', () => { 
        //here we will create a user then use the returned token to create a product
    let token : string;
    beforeAll (async () => {

        const responseObject = await response.post('/users').send({firstName : 'Mohamed' , lastName : 'Zein' , password : "01120273779"});
        token = responseObject.headers['authorization'].split(" ")[1];
  
    });
    it('Get all the users status { the index function }' , async () =>{

        const responseObject = await response.get('/users').set({ Authorization : `Bearer ${ token }` });
        expect(responseObject.status).toEqual(200);

    }) ; 
    it('Create a product { the create function }' , async () =>{

        const responseObject = await response.post('/products').set({ Authorization : `Bearer ${ token }` }).send( { name : "Udacity_coupon" , price : 40 } );
        expect(responseObject.status).toEqual(201);
    }) ;      

});