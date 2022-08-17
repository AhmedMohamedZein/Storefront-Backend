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
            const responseObject = await response.post('/users').send({firstName : 'Udacity' , lastName : 'tech' , password : "ssss"});
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
                const responseObject = await store.create( 'Mohamed' , 'Zein' ,'asdasd9') ;
                expect ( responseObject ).toBeDefined();
            });
        });

        describe('Users Module { Database integration process }  ', () => {
            let conn : PoolClient ;
            let  allUsers : QueryResult ;
            beforeAll( async () =>{
                conn = await client.connect() ;
            });
            it ('check the return of the index function', async()=>{
                try { 
                    const sql = 'SELECT * FROM users';
                    allUsers = await client.query (sql);
                }catch(error){
                    console.log (error);
                }
                const responseObject = await store.index() ;
                expect ( responseObject ).toEqual(allUsers.rows as Users[]);
            });
            it ('check the return of the show function', async()=>{
                try { 
                    const sql = 'SELECT * FROM users WHERE id = $1';
                    allUsers = await client.query (sql, [ '1' ] );
                }catch(error){
                    console.log (error);
                }
                const responseObject = await store.show('1') ;
                expect ( responseObject ).toEqual(allUsers.rows[0] as Users);
            });
            it ('check the return of the create function', async()=>{
                await store.create('Ahmed','zein','udacity') ;
                try { 
                    const sql = 'SELECT * FROM users WHERE firstName=$1 AND lastName=$2';
                    allUsers = await client.query (sql, [ 'Ahmed','zein'] );
                }catch(error){
                    console.log (error);
                }
                
                expect ( allUsers ).toBeTruthy();
            });
            afterAll (async () => {
                conn.release();
            });
        });
    });
    describe('Users authorization required routes', ()=>{
        let token: string;
        beforeAll (async () => {

            const responseObject = await response.post('/users').send({firstName : 'Netflix' , lastName : 'tech' , password : "2022"});
            token = responseObject.headers['authorization'].split(" ")[1];
      
        });
        it('Get all the users { the index function }' , async () =>{
            const responseObject = await response.get('/users').set({ Authorization : `Bearer ${ token }` });
            expect(responseObject.status).toEqual(200);
        }) ;
        it('Get a specific user { the show function }' , async () =>{
            const responseObject = await response.get('/users/1').set({ Authorization : `Bearer ${ token }` });
            expect(responseObject.status).toEqual(200);
        }) ;  
    });

});
