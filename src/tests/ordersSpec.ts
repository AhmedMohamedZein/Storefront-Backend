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
                expect ( responseObject ).toEqual( allOrders.rows[0] );
            });
            it ('check the return of the index function', async()=>{
                try { 
                    const sql = 'SELECT orders.id , products.name ,products.price , orders.status , users.firstName FROM orders INNER JOIN users ON users.id = orders.user_id INNER JOIN productsOrdersJoinTable ON productsOrdersJoinTable.order_id = orders.id INNER JOIN products ON products.id = productsOrdersJoinTable.product_id ORDER BY orders.id';
                    allOrders = await conn.query (sql);
                }catch(error){
                    console.log (error);
                }
                const responseObject = await ordersConnection.index() ;
                expect ( responseObject ).toEqual( allOrders.rows );
            });
            it ('check the return of the create function', async()=>{
                await productsOrdersConnection.create('1','1') ;
                try { 
                    const sql = 'SELECT * FROM productsOrdersJoinTable WHERE order_id=$1 AND product_id=$2';
                    allOrders = await conn.query (sql, ['1','1']);
                }catch(error){
                    console.log (error);
                }
                expect(allOrders).toBeTruthy();
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

