import supertest from "supertest";
import app from '../server';

const response = supertest(app);

describe('Products end-point', () => {

    it('Index functionality gets all products 200' , async () => {
        const responseObject = await response.get('/products');
        expect( responseObject.status).toEqual(200);
    });
    it('Show functionality get a specific product 200' , async () => {
        const responseObject = await response.get('/products/1');
        expect( responseObject.status).toEqual(200);
    });
});

describe('Users end-point', () => {

    it('Create a User functionality 200' , async () => {
        const responseObject = await response.post('/users').send({firstName : 'Mohamed' , lastName : 'Zein' , password : "01120273779"});
        expect( responseObject.status).toEqual(200);
    });
});

