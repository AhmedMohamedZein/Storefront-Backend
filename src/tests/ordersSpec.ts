import supertest from "supertest";
import app from '../server';
import client from "../database";
import { PoolClient , QueryResult } from "pg";
import { productsOrder } from '../services/productsOrder';
import { Orders , ordersConnnectionDB} from "../modules/orders";

const response = supertest(app);
const productsOrdersConnection = new productsOrder();
const ordersConnection = new ordersConnnectionDB() ;


describe('Orders End-Point', () => {
    let token : string ;    
    beforeAll (async () => {
        const responseObject = await response.post('/users').send({firstName : 'Udacity' , lastName : 'course' , password : "Big tech company"});
        token = responseObject.headers['authorization'].split(" ")[1];
        await response.post('/orders/1/1').set({ Authorization : `Bearer ${ token }` });
        await response.post('/products').set({ Authorization : `Bearer ${ token }` }).send({name : 'T-shirt' , price : 100});
    });
    describe('Orders Module', () => {
       
        describe('Orders Module The declartion ', () => {  
          
            it ('check if the index function is declared', async()=>{
                const responseObject = await ordersConnection.index() ;
                expect ( responseObject ).toBeDefined();
            });
            it ('check if the show function is declared', async()=>{
                const responseObject = await ordersConnection.show('1') ;
                expect ( responseObject ).toBeDefined();
            });
        }); 
        describe('Orders Module { Database integration process }  ', () => {  
            let conn : PoolClient ;
            let  allOrders  : QueryResult ;
            beforeAll( async () =>{
                conn = await client.connect() ;
            });
            it ('check the return of the show function', async()=>{
                try { 
                    const sql = 'SELECT * FROM orders where id =$1';
                    allOrders = await conn.query (sql, [ '1' ] );
                }catch(error){
                    console.log (error);
                }
                const responseObject = await ordersConnection.show('1') ;
                expect ( responseObject ).toEqual( allOrders.rows[0] as Orders );
            });
            afterAll (async () => {
                conn.release();
            });
        });
    });
    describe('Order authorization required routes', ()=>{
        it('Ge all orders using a token { the index function }' , async () =>{
            const responseObject = await response.get('/orders').set({ Authorization : `Bearer ${ token }` });
            expect(responseObject.status).toEqual(200);
        });   
        it('Create an order using a token { the create function }' , async () =>{
            const responseObject = await response.post('/orders/1/1').set({ Authorization : `Bearer ${ token }` });
            expect(responseObject.status).toEqual(201);
        });
        it('Show an order using a token { the show function }' , async () =>{
            const responseObject = await response.get('/orders/1').set({ Authorization : `Bearer ${ token }` });
            expect(responseObject.status).toEqual(200);
        });      
    });

});

