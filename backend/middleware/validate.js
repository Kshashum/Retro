const jwt = require("jsonwebtoken")
require("dotenv").config()

module.exports = async (req, res, next) => {
    const token = req.header("token");
    try {
        var decoded = jwt.verify(token, process.env.JWTKEY);
        req.body.userid = decoded.userid
        next()
    }
    catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
}