import supertest from "supertest";
import app from '../server';
import {productsConnectionDB , Product} from '../modules/products';
import client from "../database";
import { PoolClient , QueryResult } from "pg";
const response = supertest(app);
const store = new productsConnectionDB() ;

describe('Products End-Point', () => {
   
    describe('Products HTTP 1.1 status codes', () => {
        
        it('Index function  { gets all products 200 }' , async () => {
            const responseObject = await response.get('/products');
            expect( responseObject.status).toEqual(200);
        });
        it('Show function { gets a specific product 200 }' , async () => {
            const responseObject = await response.get('/products/1');
            expect( responseObject.status).toEqual(200);
        });
        it('Create function without a token or login info 400`' , async () => {
            const responseObject = await response.post('/products');
            expect( responseObject.status).toEqual(400);
        });
    });
    describe('Products Module', () => {
       
        describe('Products Module The declartion ', () => {  
            it ('check if the index function is declared', async()=>{
                const responseObject = await store.index() ;
                expect ( responseObject ).toBeDefined();
            });
            it ('check if the show function is declared', async()=>{
                const responseObject = await store.show('1') ;
                expect ( responseObject ).toBeDefined();
            });
        });
    });
    describe('Products Module { Database integration process }  ', () => {  
        let conn : PoolClient ;
        let  allProduct : QueryResult ;
        beforeAll( async () =>{
            conn = await client.connect() ;
        });
        it ('check the return of the index function', async()=>{
            try { 
                const sql = 'SELECT * FROM products';
                allProduct = await client.query (sql);
            }catch(error){
                console.log (error);
            }
            const responseObject = await store.index() ;
            expect ( responseObject ).toEqual(allProduct.rows as Product[]);
        });
        it ('check the return of the show function', async()=>{
            try { 
                const sql = 'SELECT * FROM products WHERE id = $1';
                allProduct = await client.query (sql, [ '1' ] );
            }catch(error){
                console.log (error);
            }
            const responseObject = await store.show('1') ;
            expect ( responseObject ).toEqual(allProduct.rows[0] as Product);
        });
        afterAll (async () => {
            conn.release();
        })
    });   
});



