import client from "../database";
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();
type Users = {
    id ?: string ,
    firstName ?: string,
    lastName ?: string,
    password ?: string
};

class usersConnectionDB {

    async index () : Promise <Users[]| Error> {
        try { 
            const conn = await client.connect() ;
            const sql = 'SELECT * FROM users';
            const allUsers = await client.query (sql);
            conn.release();
            if (!allUsers.rows) {
                throw new Error ('there is no users, users table is empty !');
            }
            return allUsers.rows ;
        }catch (error){
            console.log ( `error happen in the usersDB class in the index function, error : ${error}`);
            return new Error (`error message : ${error}`) ;
        }
    }
    async show (id : string) : Promise<Users | Error> {
        try { 
            const conn = await client.connect() ;
            const sql = 'SELECT * FROM users WHERE id = $1';
            const allUsers = await client.query (sql, [ id ] );
            conn.release();
            if (!allUsers.rows) {
                throw new Error ('there is no user with this ID !');
            }
            return allUsers.rows[0] ;
        }catch (error){
            console.log ( `error happen in the usersDB class in the index function, error : ${error}`);
            return new Error (`error message : ${error}`) ;
        }
    }
        // TO call this function you need to be verified
    async create ( firstName : string , lastName : string , password : string ) : Promise<void | unknown> {
        try { 
            // hashing the password using pepper and salt 
            const temPasssword = password ;
            password = await bcrypt.hash (temPasssword + process.env.PEPPER , parseInt ( process.env.SALT as string ) );
            //
            const conn = await client.connect() ;
            const sql = 'INSERT INTO users (firstName , lastName, password) VALUES ($1, $2 ,$3)';
            await client.query (sql, [firstName , lastName , password] );
            const token = await jwt.sign({ firstName: firstName , lastName : lastName}, process.env.SECRET as string);
            conn.release();
            return token ;
        }catch (error){
            console.log ( `error happen in the usersDB class in the index function, error : ${error}`);
            return new Error ('create problem') ;
        } 
    } 
}

export { Users ,  usersConnectionDB };