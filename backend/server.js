// imports required
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const searchRouter = require("./Routers/searchRouter");
const authRouter = require("./Routers/authRouter");
const productRouter = require("./Routers/productRouter");
const cartRouter = require("./Routers/cartRouter");
const reviewRouter = require("./Routers/reviewRouter");
const orderRouter = require("./Routers/orderRouter");
const elasticingest = require("./elastic/elasticingestion");
const app = express();

//middleware
app.use(express.json());
app.use(cors());

//ingest data into elastic
//elasticingest()

//Routers
app.use('/api/v1/search',searchRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/products',productRouter)
app.use('/api/v1/cart',cartRouter)
app.use('/api/v1/reviews',reviewRouter)
app.use('/api/v1/order',orderRouter)

app.listen(process.env.PORT || 4000, (req, res) => {
    console.log(`listening at port ${process.env.PORT}`);
})