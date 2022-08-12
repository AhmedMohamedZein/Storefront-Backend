# Storefront-Backend

## Overview
 
- This project was made for an education purpose, we can say that this project is a backend for an online store.
- Create database schema using migration.
- You sholud use the end-point `HTTP1.1  POST   /user` to create a user this method will return a token you can use it later.
- You should have a environment variables that have the following :
       ` POSTGRES_HOST `
       ` POSTGRES_USER `
       ` POSTGRES_PASSWORD `
       ` POSTGRES_DB_DEV `
        `SALT ` for hashing password
       ` PEPPER ` the hashing secret
       `SECRET` for token signature
       and finally a `PORT` 
 
 ## Scripts
 
 1.  `npm run test` : 

        Will compile the typescript into javascript 'build the production file .js' then test it using jasnime    

  2. `npm run dev` :   

        Will run the server using nodemon .ts file at port 8000 unless you have a .env file 
         
  3. `npm run start`  :
  
        Will build the production file then start the server with node.js
   
  4. `npm run build` :
        
        Will compile the typescript into javascript 'build the production file .js', without running anything.
 
 5. `npm run migrateUp` : 
 
      Will migrate the database up
      
 6. `npm run migrateDown` : 
 
       ill migrate the database down
       
      
 ##  Documentation
 
  | End-point         | Method               | Requirements                   | Responses   
  | ------------------|----------------------|--------------------------------|----------------------------------------------|
  | `/products`       | GET                  |  none                        |- `status 200` with all the products in the db. <br /> -  `status 500` server error and a error message server error
  | `/products/id`    | GET                 | a id input params URL         |- `status 200` with the required product from the db <br /> - `status 400` bad request if the id is not an intger
  | `/products`       | POST                |  requests a body and a token, example <br /> {  <br /> 'name' : 'car', <br /> 'price' : 2000 <br /> } | - `status 201` product has beed created  <br />-`status 400` bad request if the input data invalide or the token invalide <br />-`status 500` server error and a error message
  | `/users`          | GET                  | token                         | - `status 200` with all users in the db. <br />  -  `status 500` server error and a error message server error  <br />  - `status 400` bad request if the input data invalide or the token invalide <br />-`status 500` server error and a error message
  | `/users/:id`      | GET                   | token                         | - `status 200` with the required user from the db <br /> - `status 400` bad request if the id is not an intger <br />-`status 500` server error and a error message
  | `/users`          | POST                  | none                          |  - `status 201` user has beed created  <br />-`status 400` bad request if the input data invalide <br />-`status 500` server error and a error message
  | `/users/:id/orders`| GET                  | requests a body and a token   |  - `status 200` with the required data from the db <br /> - `status 400` bad request if the id is not an intger  <br />-`status 500` server error and a error message
 
  
 
