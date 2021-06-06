const authRouter = require("express").Router();
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const validinfo = require("../middleware/validinfo");
const pool = require("../postgres/db");
require("dotenv").config()
//router for the authorization path

//register path
authRouter.post('/register', validinfo, async (req, res) => {
    //extract the params from the body
    const { name, email, password } = req.body
    try {
        //check if user already exists
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        //if the length of the rows is 0, then there is no user with this email, so we can register user
        if (result.rows.length === 0) {
            //use the bcrypt lib
            const hash = await bcrypt.hash(password, 10);
            //insert user info to the database
            const result = await pool.query("INSERT INTO Users(Name,email,password) VALUES ($1,$2,$3) RETURNING *", [name, email, hash])
            if (result.rows.length === 1) {
                //assign a jwt token
                const token = jwt.sign({
                    userid: result.rows[0].userid
                }, process.env.JWTKEY, { expiresIn: '1h' });
                res.json({ msg: "user created", token, name: result.rows[0].name, userid: result.rows[0].userid }).status(201)
            }
            else {
                res.status(500)
            }
        }
        else {
            res.json({ error: "user already exits" }).status(401)
        }
    }
    catch (err) {
        console.log(err.message)
    }

})

//login route
authRouter.post('/login', validinfo, async (req, res) => {
    const { email, password } = req.body
    try {
        //check if the user exists
        const result = await pool.query("SELECT * FROM Users WHERE email = $1", [email])
        if (result.rows.length == 1) {
            //if user exists compare the password
            const val = await bcrypt.compare(password, result.rows[0].password)
            if (val) {
                //if the password match send a jwt token
                const token = jwt.sign({ userid: result.rows[0].userid }, process.env.JWTKEY, { expiresIn: '1h' })
                res.json({ msg: "user logged in", token, name: result.rows[0].name, userid: result.rows[0].userid })
            }
            else {
                res.json({ msg: 'wrong password' }).status(401)
            }
        }
        else {
            res.json({ msg: "User Does not exists" }).status(401)
        }
    }
    catch (err) {
        console.log(err.message)
    }

})
module.exports = authRouter