const validate = require('../middleware/validate')
const pool = require('../postgres/db')
const orderRouter = require('express').Router()

orderRouter.get('/',validate,async(req,res)=>{
    const userid = req.userid
    try{
        const result = await pool.query("SELECT * FROM Ord WHERE userid = $1",[userid])
        res.json(result).status(200)
    }
    catch(err){
        console.log(err)
        res.status(500)
    }
})

orderRouter.post('/:cartid',validate,async(req,res)=>{
    const userid = req.userid
    const {cartid}=req.params.cartid
    try {
        const res = await pool.query("SELECT SUM(quantity*price) as s FROM CartItems INNER JOIN Products ON CartItems.productid = Products.productid WHERE CartItems.cartid = $1",[cartid])
        const result = await pool.query("INSERT INTO Ord(userid,cartid,totalprice) VALUES ($1,$2,$3)",[userid,cartid,res.rows[0][s]])
        res.status(200)
    } catch (err) {
        console.log(err)
        res.status(500)        
    }
})
module.exports = orderRouter