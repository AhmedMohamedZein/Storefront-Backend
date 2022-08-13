import supertest from "supertest";
import app from '../server';
import { Users , usersConnectionDB } from "../modules/users";
import { PoolClient, QueryResult } from "pg";
import client from "../database";
const response = supertest(app);
const store = new usersConnectionDB();

describe('Users end-point', () => {
    
    describe('Users HTTP 1.1 status codes', () => {
        it('Create a user function 200' , async () => {
            const responseObject = await response.post('/users').send({firstName : 'Mohamed' , lastName : 'Zein' , password : "01120273779"});
            expect( responseObject.status).toEqual(200);
        });
    });
    describe('Users Module', () => { 

        describe('Users Module The declartion ', () => { 
            it ('check if the index function is declared', async()=>{
                const responseObject = await store.index() ;
                expect ( responseObject ).toBeDefined();
            });
            it ('check if the show function is declared', async()=>{
                const responseObject = await store.show('1') ;
                expect ( responseObject ).toBeDefined();
            });
            it ('check if the show function is declared', async()=>{
                const responseObject = await store.create( 'Mohamed' , 'Zein' ,'01120273779') ;
                expect ( responseObject ).toBeDefined();
            });
        });

        describe('Users Module { Database integration process }  ', () => {
            let conn : PoolClient ;
            let  allProduct : QueryResult ;
            beforeAll( async () =>{
                conn = await client.connect() ;
            });
            it ('check the return of the index function', async()=>{
                try { 
                    const sql = 'SELECT * FROM users';
                    allProduct = await client.query (sql);
                }catch(error){
                    console.log (error);
                }
                const responseObject = await store.index() ;
                expect ( responseObject ).toEqual(allProduct.rows as Users[]);
            });
            it ('check the return of the show function', async()=>{
                try { 
                    const sql = 'SELECT * FROM users WHERE id = $1';
                    allProduct = await client.query (sql, [ '1' ] );
                }catch(error){
                    console.log (error);
                }
                const responseObject = await store.show('1') ;
                expect ( responseObject ).toEqual(allProduct.rows[0] as Users);
            });
        });
    });

});
