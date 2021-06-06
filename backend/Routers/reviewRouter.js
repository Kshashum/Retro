const validator = require("../middleware/validate");
const pool = require("../postgres/db");
const reviewRouter = require("express").Router();

//Router to get all the reviews  in the data base
reviewRouter.get('/:productid', async (req, res) => {
    const productid = req.params.productid
    try {
        const result = await pool.query("SELECT * FROM  Reviews WHERE productid= $1", [productid]);
        res.json(result.rows).status(200)
    }
    catch (err) {
        console.log(err.message);
    }
})

//Route to add a review to the data base
reviewRouter.post('/', validator, async (req, res) => {
    const { userid,name, productid, review, rating} = req.body;
    try {
        const result = await pool.query("INSERT INTO Reviews (userid,name,productid,review,rating) VALUES ($1,$2,$3,$4,$5) RETURNING *", [userid,name, productid, review, rating])
        if (result.rows.length === 0) {
            res.json({ error: "server error" }).status(500)
        }
        else {
            res.json(result.rows).status(201)
        }
    }
    catch (err) {
        res.status(404);
        console.log(err.message);
    }
})

// Route to update a review in the data base
reviewRouter.put("/", validator, async (req, res) => {
    const { userid, productid, review, rating, reviewid } = req.body;
    try {
        const result = await pool.query("UPDATE Reviews  SET review=$3, rating=$4 WHERE userid=$1 AND productid =$2 and reviewid=$5 RETURNING * ", [userid, productid, review, rating, reviewid])
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

//Route to delete a review in the database
reviewRouter.delete("/", validator, async (req, res) => {
    const { reviewid, userid } = req.body;
    try {
        const result = await pool.query("DELETE FROM Reviews  WHERE reviewid = $1 and userid=$2 RETURNING *", [reviewid, userid]);
        if (result.rows.length === 1) {
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
module.exports = reviewRouter;