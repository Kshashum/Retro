/* Data base commands */
CREATE DATABASE retrotech;
CREATE EXTENSION "uuid-ossp";
CREATE TABLE Users(
    userid uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    Name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Products(  
    productid SERIAL PRIMARY KEY,
    upc VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(255),
    shortDescription VARCHAR(1000),
    longDescription VARCHAR(3000),
    Price INT
);
CREATE TABLE Cart(
    cartid BIGSERIAL PRIMARY KEY,
    userid uuid REFERENCES Users(userid) ON DELETE CASCADE,
    dataCreated TIMESTAMP
);
CREATE TABLE CartItems(
    cartid BIGINT REFERENCES Cart(cartid) ON DELETE CASCADE,
    productid INT REFERENCES Products(productid) ON DELETE CASCADE,
    quantity INT,
    discount FLOAT,
    PRIMARY KEY(cartid, productid)
);
CREATE TABLE Ord(
    orderid BIGSERIAL,
    userid uuid REFERENCES Users(userid) ON DELETE CASCADE,
    cartid BIGINT REFERENCES Cart(cartid) ON DELETE CASCADE,
    name VARCHAR(255),
    address VARCHAR(500),
    pincode INT,
    totalprice INT,
    PRIMARY KEY (cartid)
);
CREATE TABLE Reviews(
    reviewid SERIAL PRIMARY KEY,
    userid uuid REFERENCES Users(userid) ON DELETE CASCADE,
    productid INT REFERENCES Products(productid) ON DELETE CASCADE,
    name VARCHAR(100),
    rating FLOAT,
    review VARCHAR(500)
);
\copy products(upc,name,manufacturer,shortDescription,longDescription,Price) FROM 'C:\Users\KrishnaS\Desktop\Projects\retro\retrotech\products.csv' DELIMITER ',' CSV;


CREATE TABLE Signals(
    signalid BIGSERIAL,
    query VARCHAR(500),
    upc VARCHAR(255),
    boost INT
);
\copy Signals(query,upc,boost) FROM 'C:\Users\KrishnaS\Desktop\Projects\retro\backend\signals\part-00000-465be0e6-827f-438a-ba23-946e67cd92c7-c000.csv' DELIMITER ',' CSV;