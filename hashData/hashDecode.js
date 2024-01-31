const jwt = require("jsonwebtoken");

const hashDecode = (token) => {
    const secretKey = "password";
    const decorde = jwt.verify(token, secretKey);
    return decorde;
}

exports.hashDecode = hashDecode;
