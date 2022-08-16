import client from '../database';

class productsOrder {

    // show will return the orders for this specific user using id 
    async create (user_id : string , product_id : string) : Promise<void | Error> {
    
        try{
            const conn = await client.connect() ;
            let sql = 'INSERT INTO orders (status , user_id) VALUES ($1,$2)';
            await client.query (sql, [ 'active' , user_id ]);
            sql = 'SELECT id FROM orders WHERE user_id=$1';
            const order_id = await client.query (sql, [ user_id ]);
            sql = 'INSERT INTO productsOrdersJoinTable (order_id , product_id) VALUES ($1,$2)';
            await client.query (sql, [ order_id.rows[0].id , product_id ]);
            conn.release();   
            return;
        }
        catch (error) {
        //    console.log (`error in the productsOrder class create function ${error}`);
            return new Error (`error happened ${error}`);
        }
    }
}


export { productsOrder } ;