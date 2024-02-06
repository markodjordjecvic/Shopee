const jwt = require("jsonwebtoken");

const hashPassword = async (req, res) => {

    const parameters = req.body;

    const payload = {
        "data": req.body,
        "timestamp": Date.now()
    }
    const secretKey = "password";
    const header = {
        "alg": "HS256",
        "typ": "JWT",
        "account":"Shopee"
    }

    const token = jwt.sign(payload, secretKey, {header, expiresIn: "1500h"});

    res.status(200).json({
        "response": token
    })
}

const hashDecode = (req, res) => {

    const secretKey = "password";
    const token = req.body.token;
    const decorde = jwt.verify(token, secretKey);

    res.status(200).json({
        "response": decorde
    });

}

module.exports = { hashPassword, hashDecode };