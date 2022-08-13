import supertest from "supertest";
import app from '../server';
import client from "../database";
import { PoolClient , QueryResult } from "pg";
import {Orders ,  productsOrder} from '../services/productsOrder';

const response = supertest(app);
const store = new productsOrder() ;


describe('Orders End-Point', () => {


    describe('Orders Module', () => {
       
        describe('Orders Module The declartion ', () => {  
            
            it ('check if the index function is declared', async()=>{
                const responseObject = await store.show('1') ;
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
                    const sql = 'SELECT firstName,lastName,price,status FROM orders INNER JOIN productsOrdersJoinTable ON orders.id = productsOrdersJoinTable.order_id  INNER JOIN products ON products.id = productsOrdersJoinTable.product_id INNER JOIN users ON orders.user_id = users.id WHERE users.id = $1';
                    allOrders = await client.query (sql, [ '1' ] );
                }catch(error){
                    console.log (error);
                }
                const responseObject = await store.show('1') ;
                expect ( responseObject ).toEqual( allOrders.rows as Orders[] );
            });
            afterAll (async () => {
                conn.release();
            });
        });
    });

});

