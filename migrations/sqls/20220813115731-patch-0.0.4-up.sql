/* Replace with your SQL commands */
CREATE TABLE productsOrdersJoinTable (
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);


INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (1,1);
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (2,2);
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (3,3);
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (4,1);

