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

orderRouter.post('/',validate,async(req,res)=>{
    const userid = req.userid
    const {address,pincode,name,cartid}=req.body.body
    try {
        const mid = await pool.query("SELECT SUM(quantity*price) as s FROM CartItems INNER JOIN Products ON CartItems.productid = Products.productid WHERE CartItems.cartid = $1",[cartid])
        const result = await pool.query("INSERT INTO Ord(userid,cartid,name,address,pincode,totalprice) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",[userid,cartid,name,address,pincode,mid.rows[0].s])
        res.json(result).status(200)
    } catch (err) {
        console.log(err)
        res.status(500)        
    }
})
module.exports = orderRouter