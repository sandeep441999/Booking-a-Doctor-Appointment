const jwt = require("jsonwebtoken");
require("dotenv").config();

//this funtion can be used to protect routes in situation like a API endpoint can be accessed only when a user is logged in

const authverify = (req, res, next) => {
  const auth_header = req.headers["authorization"];
  if (!auth_header) return res.status(401).json({
    message: 'Authorization failed'
  });
  const token = auth_header.split(" ")[1];
  jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, decoded) => {
    if (err) return res.status(403);  //invalid token
    req.userData = decoded;
    next();
  });
};


module.exports = authverify;
