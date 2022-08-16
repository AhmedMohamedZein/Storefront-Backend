# Storefront-Backend

## Overview
 
- This project was made for an education purpose, we can say that this project is a backend for an online store.
- Create database schema using migration.
- You sholud use the end-point `HTTP1.1  POST   /user` to create a user this method will return a token you can use it later.
      
      
 ## Environment variables 
       
- `POSTGRES_HOST` : Where is your database, { "localhost","127.0.0.1" } ? or in somewhere else. 
     
     
 - `POSTGRES_USER` : this user should have permission to read and write on the given database.
     
     
 - `POSTGRES_PASSWORD` : user's password.
     
     
 - `POSTGRES_DB_DEV` :  development database.
     
     
 - `POSTGRES_DB_TEST` : test database.
     
     
 - `SALT`: for salt rounds.
     
     
 - `PEPPER` : the hashing secret.
     
     
 - `SECRET` :  for token signature, JWT.
     
     
 - `PORT` : you can leave it empty the server will run default on port 8000.
     
 ## Scripts
 
 1.  `npm run test` : 

       Will migrate:up all data  then compile the typescript into javascript 'build the production file .js' then test it using jasnime and in the end it will migrate:down the database.   

  2. `npm run dev` :   

        Will run the server using nodemon .ts file at port 8000 unless you have a .env file 
         
  3. `npm run start`  :
  
        Will migrate:up all the data then compile the typescript into javascript 'build the production file .js' then starts the server
   
  4. `npm run build` :
        
        Will compile the typescript into javascript 'build the production file .js', without running anything.
 
 5. `npm run migrateUp` : 
 
      Will migrate the database up
      
 6. `npm run migrateDown` : 
 
       Will migrate the database down
       
      
 ##  Documentation
 
  | End-point         | Method               | Requirements                   | Responses   
  | ------------------|----------------------|--------------------------------|----------------------------------------------|
  | `/products`       | GET                  |  none                        |- `status 200` with all the products in the db. <br /> -  `status 500` server error and a error message server error
  | `/products/:id`    | GET                 | a id input params URL         |- `status 200` with the required product from the db <br /> - `status 400` bad request if the id is not an intger
  | `/products`       | POST                |  requests a body and a token or login info in the body, example <br /> {  <br /> 'name' : 'car', <br /> 'price' : 2000 <br /> } <br  /> OR {  <br /> 'firstName' : 'Ahmed', <br /> 'lastName' : "Zein" <br /> "password" : "22233" <br  /> } | - `status 201` product has beed created with the payload of your token <br />-`status 400` bad request if the input data invalide or the token invalide <br />-`status 500` server error and a error message
  | `/users`          | GET                  | token or a login info in the body <br  />  {  <br /> 'firstName' : 'Ahmed', <br /> 'lastName' : "Zein" <br /> "password" : "22233" <br  /> }                        | - `status 200` with all users in the db. <br />  -  `status 500` server error and a error message server error  <br />  - `status 400` bad request if the input data invalide or the token invalide <br />-`status 500` server error and a error message
  | `/users/:id`      | GET                   | token or a login info in the body <br  />  {  <br /> 'firstName' : 'Ahmed', <br /> 'lastName' : "Zein" <br /> "password" : "22233" <br  /> }                         | - `status 200` with the required user from the db <br /> - `status 400` bad request if the id is not an intger <br />-`status 500` server error and a error message
  | `/users`          | POST                  | {  <br /> 'firstName' : 'Ahmed', <br /> 'lastName' : "Zein" <br /> "password" : "22233" <br  />}                          |  - `status 201` user has beed created  <br />-`status 400` bad request if the input data invalide <br />-`status 500` server error and a error message
  | `/orders` | GET | token or a login info in the body  <br  />  {  <br /> 'firstName' : 'Ahmed', <br /> 'lastName' : "Zein" <br /> "password" : "22233" <br  /> } | `status 200` with the required data from the db <br /> -`status 500` server error and a error message|
  | `/orders/:id`     | GET                  | token or a login info in the body <br  />  {  <br /> 'firstName' : 'Ahmed', <br /> 'lastName' : "Zein" <br /> "password" : "22233" <br  /> }  |  - `status 200` with the required data from the db <br /> - `status 400` bad request if the id is not an intger  <br />-`status 500` server error and a error message
  | `/orders/:user_id/:product_id` | POST | token |  - `status 201` order has beed created  <br />-`status 400` bad request if the input data invalide <br />-`status 500` server error and a error message
   
 
  
 
