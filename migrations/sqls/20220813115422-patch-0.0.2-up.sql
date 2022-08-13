/* Replace with your SQL commands */
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(70) NOT NULL,
    lastName VARCHAR(70) NOT NULL,
    password VARCHAR(255) NOT NULL
);

INSERT INTO users (firstName , lastName, password ) VALUES ('Ahmed' , 'Zein', 'mockpwd1');
INSERT INTO users (firstName , lastName, password ) VALUES ('Omnia' , 'Zein', 'mockpwd2');
INSERT INTO users (firstName , lastName, password ) VALUES ('Mohamed' , 'Zein', 'mockpwd3');