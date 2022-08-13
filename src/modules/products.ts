import client from "../database";

type Product = {
    id ?: string ,
    name ?: string,
    price ?: number
};

class productsConnectionDB {
    // show all products 
    async index () : Promise <Product[] | Error> {
        try { 
            const conn = await client.connect() ;
            const sql = 'SELECT * FROM products';
            const allProduct = await client.query (sql);
            conn.release();
            if (!allProduct.rows) {
                throw new Error ('the products table is empty !');
            }
            return allProduct.rows ;
        }catch (error){
            //console.log ( `error happen in the productDB class in the index function, error : ${error}`);
            return new Error (`error message : ${error}`) ;
        }
    }
    async show (id : string) : Promise<Product | Error> {
        try { 
            const conn = await client.connect() ;
            const sql = 'SELECT * FROM products WHERE id = $1';
            const allProduct = await client.query (sql, [ id ] );
            conn.release();
            if (!allProduct.rows) {
                throw new Error ('there is no products with this ID !');
            }
            return allProduct.rows[0] ;
        }catch (error){
           // console.log ( `error happen in the productDB class in the show function, error : ${error}`);
            return new Error (`error message : ${error}`) ;
        }
    }
    // TO call this function you need to be verified
    async create ( name : string , price : number ) : Promise<void | unknown> {
        try { 
            const conn = await client.connect() ;
            const sql = 'INSERT INTO products (name , price) VALUES ($1, $2)';
            await client.query (sql, [name , price] );
            conn.release();
        }catch (error){
            //console.log ( `error happen in the productDB class in the index function error : ${error}`);
            return new Error ('create problem') ;
        } 
    } 
}

export { Product , productsConnectionDB } ;