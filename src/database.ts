import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const ENV = process.env.ENV || 'test' ;
let client = new Pool();
if ( ENV === 'dev' ) {
    const {
        POSTGRES_HOST,
        POSTGRES_DB_DEV,
        POSTGRES_USER,
        POSTGRES_PASSWORD
    } = process.env ;
    
    client = new Pool ({
        host : POSTGRES_HOST,
        database : POSTGRES_DB_DEV,
        user : POSTGRES_USER,
        password :POSTGRES_PASSWORD
    });
}

if ( ENV === 'test' ) {
    const {
        POSTGRES_HOST,
        POSTGRES_DB_TEST,
        POSTGRES_USER,
        POSTGRES_PASSWORD
    } = process.env ;

    client = new Pool ({
        host : POSTGRES_HOST,
        database : POSTGRES_DB_TEST,
        user : POSTGRES_USER,
        password :POSTGRES_PASSWORD
    });
}


export default client ;



