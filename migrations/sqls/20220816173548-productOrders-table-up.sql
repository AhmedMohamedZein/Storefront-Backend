/* Replace with your SQL commands */
CREATE TABLE productsOrdersJoinTable (
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);

