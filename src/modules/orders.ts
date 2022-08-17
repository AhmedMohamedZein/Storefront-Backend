import client from "../database";
import {QueryResult} from 'pg';
type Orders = {
    id ?: string ,
    status ?: string,
    user_id ?: string,
    product_id ?: string
};

class ordersConnnectionDB {

    async index () : Promise<QueryResult[] | Error> {

        try{
            const conn = await client.connect() ;
            const sql = 'SELECT orders.id , products.name ,products.price , orders.status , users.firstName FROM orders INNER JOIN users ON users.id = orders.user_id INNER JOIN productsOrdersJoinTable ON productsOrdersJoinTable.order_id = orders.id INNER JOIN products ON products.id = productsOrdersJoinTable.product_id ORDER BY orders.id';
            const allOrders = await client.query (sql);
            conn.release();
            if (!allOrders.rows) {
                throw new Error ('the orders table is empty !');
            }
            return allOrders.rows ;     
        }
        catch (error) {
         //   console.log (`Error happend inside the ordersConnnectionDB class ${error}`);
            return new Error (`error happened ${error}`);
        }
    }
    async show (id : string) : Promise<QueryResult | Error> {
        try{
            const conn = await client.connect() ;
            const sql = 'SELECT * FROM orders where id =$1';
            const order = await client.query (sql, [ id ]);
            conn.release();
            if (!order.rows) {
                throw new Error ('this order does not exists !');
            }
            return order.rows[0];     
        }
        catch (error) {
         //   console.log (`Error happend inside the ordersConnnectionDB class ${error}`);
            return new Error (`error happened ${error}`);
        }
    }
}

export {  Orders , ordersConnnectionDB } ; 