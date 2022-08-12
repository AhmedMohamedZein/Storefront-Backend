/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(70) NOT NULL,
    lastName VARCHAR(70) NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TYPE status AS ENUM  ('active','complete');

CREATE TABLE orders (
    id SERIAL PRIMARY KEY ,
    user_id INT REFERENCES  users(id),
    status status
);

CREATE TABLE productsOrdersJoinTable (
    order_id INT REFERENCES orders(id),
    product_id INT REFERENCES products(id)
);

INSERT INTO products (name , price) VALUES ('Car' , 400600);
INSERT INTO products (name , price) VALUES ('Pieck' , 3500);
INSERT INTO products (name , price) VALUES ('T-SHIRT' , 60);
INSERT INTO users (firstName , lastName, password ) VALUES ('Ahmed' , 'Zein', 'mockpwd1');
INSERT INTO users (firstName , lastName, password ) VALUES ('Omnia' , 'Zein', 'mockpwd2');
INSERT INTO users (firstName , lastName, password ) VALUES ('Mohamed' , 'Zein', 'mockpwd3');
INSERT INTO orders (user_id,status) VALUES (1,'active');
INSERT INTO orders (user_id,status) VALUES (1,'complete');
INSERT INTO orders (user_id,status) VALUES (1,'complete');
INSERT INTO orders (user_id,status) VALUES (2,'active');
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (1,1);
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (2,2);
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (3,3);
INSERT INTO productsOrdersJoinTable (order_id, product_id) VALUES (4,1);

