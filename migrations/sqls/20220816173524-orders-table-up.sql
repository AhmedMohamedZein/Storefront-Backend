/* Replace with your SQL commands */
CREATE TYPE status AS ENUM  ('active','complete');
CREATE TABLE orders (
    id SERIAL PRIMARY KEY ,
    user_id INT REFERENCES  users(id),
    status status
);

INSERT INTO orders (user_id,status) VALUES (1,'active');
INSERT INTO orders (user_id,status) VALUES (1,'complete');
INSERT INTO orders (user_id,status) VALUES (1,'complete');
INSERT INTO orders (user_id,status) VALUES (2,'active');