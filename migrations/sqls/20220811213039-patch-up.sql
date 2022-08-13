/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

INSERT INTO products (name , price) VALUES ('Car' , 400600);
INSERT INTO products (name , price) VALUES ('Pieck' , 3500);
INSERT INTO products (name , price) VALUES ('T-SHIRT' , 60);
