const pool = require('../postgres/db');
const productRouter = require('express').Router()


productRouter.get('/:productid', async (req, res) => {
    const productid = req.params.productid
    try {
        const result = await pool.query("SELECT * FROM Products WHERE productid = $1", [productid]);
        res.json(result.rows).status(200)
    }
    catch (err) {
        console.log(err.message);
    }
})

productRouter.post('/',async (req,res)=>{
    const {upc,name,manufacturer,shortDescription,longDescription, Price} = req.body
    try{
        const result = await pool.query("INSERT INTO Products(upc,name,manufacturer,shortDescription,longDescription, Price) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[upc,name,manufacturer,shortDescription,longDescription,Price])
        if (result.rows.length === 0){
            res.json({ error: "server error" }).status(500)
        }
        else{
            res.json(result.rows).status(201)
        }
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})

productRouter.put("/", async (req, res) => {
    const { productid, name, manufacturer, shortDescription, longDescription, Price } = req.body;
    try {
        const result = await pool.query("UPDATE products SET name=$2, manufacturer =$3, shortDescription =$4, longDescription=$5 ,price = $6 WHERE productid=$1 RETURNING * ", [productid, name, manufacturer, shortDescription, longDescription, Price])
        if (result.rows.length === 0) {
            res.json({ error: "server error" }).status(500)
        }
        else {
            res.json(result.rows).status(200)
        }
    }
    catch (err) {
        console.log(err.message)
    }
})
productRouter.delete("/:productid", async (req, res) => {
    const productid = req.params.productid
    try {
        const result = await pool.query("DELETE FROM products WHERE productid = $1 RETURNING *", [productid]);
        if (result.rows.length >= 1) {
            res.json({ msg: "delete successful" }).status(200)
        }
        else {
            res.json({ msg: "not found" }).status(404)
        }
    }
    catch (err) {
        console.log(err.message)
    }

})
module.exports = productRouter