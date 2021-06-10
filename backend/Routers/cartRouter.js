const validate = require('../middleware/validate')
const pool = require('../postgres/db')
const cartRouter = require('express').Router()

cartRouter.get('/:cartid',validate, async (req,res)=>{
    const cartid = req.params.cartid
    try {
        const result = await pool.query('SELECT productid, quantity, price FROM CartItem WHERE cartid=$1',[cartid])
        res.json(result).status(200)
        
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

cartRouter.post('/',validate,async(req,res)=>{
    const userid = req.userid
    try {
        const result = await pool.query(`INSERT INTO Cart(userid,dataCreated) VALUES ($1,to_timestamp(${Date.now()} / 1000.0)) RETURNING *`,[userid])
        res.json(result).status(201)
        
    } catch (err) {
        console.log(err)
        res.status(500)
    }
})

cartRouter.put('/',validate,async (req,res)=>{
    const {productid,quantity, cartid} = req.body.body
    try {
        const result = await pool.query("SELECT * FROM CartItems WHERE productid=$1 AND cartid=$2",[productid,cartid])
        if(result.rows.length === 0){
            await pool.query("INSERT INTO CartItems(cartid,productid,quantity) VALUES ($1,$2,$3)",[cartid,productid,quantity])
            const results = await pool.query("SELECT * FROM CartItems WHERE cartid = $1",[cartid])
            res.json(results).status(200)
        }
        else if(quantity === 0){
            const results = await pool.query("DELETE FROM CartItems WHERE productid=$1 AND cartid = $2",[productid,cartid])
            res.json(results).status(200)
        }
        else{
            await pool.query("UPDATE Cartitems SET quantity=$3 WHERE productid=$1 AND cartid=$2",[productid,cartid,quantity])
            const results = await pool.query("SELECT * FROM CartItems WHERE cartid = $1",[cartid])
            res.json(results).status(200)
        }        
    } catch (err) {
        console.log(err)
        res.status(500)
        
    }
})

module.exports = cartRouter