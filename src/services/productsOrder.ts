import client from '../database';
type Orders = {
    id ?: string ,
    status ?: string,
    products ?: string[]
};

class productsOrder {

    // show will return the orders for this specific user using id 
    async show (id : string ) : Promise<Orders[] | Error> {
        try { 
            const conn = await client.connect() ;
            const sql = 'SELECT firstName,lastName,price,status FROM orders INNER JOIN productsOrdersJoinTable ON orders.id = productsOrdersJoinTable.order_id  INNER JOIN products ON products.id = productsOrdersJoinTable.product_id INNER JOIN users ON orders.user_id = users.id WHERE users.id = $1 ';
            const allOrders = await client.query (sql, [ id ] );
            conn.release();
            if (!allOrders.rows) {
                throw new Error ('there is no user with this ID !');
            }
            return allOrders.rows ;
        }catch (error){
            console.log ( `error happen in the productsOrder class in the show function, error : ${error}`);
            return new Error (`error message : ${error}`) ;
        }
    }
}


export {Orders ,  productsOrder} ;