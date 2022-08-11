/* Replace with your SQL commands */
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);

INSERT INTO products (name , price) VALUES ('AhmedZein' , 400000);

INSERT INTO users (firstName , lastName, password ) VALUES ('Ahmed' , 'Zein', '0598251140');
