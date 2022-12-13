const jwt = require("jsonwebtoken");
require("dotenv").config();

//this funtion can be used to reinitialize the access key

const refreshtokenverify = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies) return res.status(401).json({
    message: 'Authorization failed'
  });
  const refresh_token = cookies.jwt;
  jwt.verify(refresh_token, process.env.JWT_REFRESH_KEY, (err, decoded) => {
    if (err) return res.status(403);  //invalid token
    const access_token = jwt.sign({
        email: decoded.email,
        doctorId: decoded._id,
      },
      process.env.JWT_ACCESS_KEY,
      {
        expiresIn: "1d",
      });
      res.json({ access_token });
  });
};


module.exports = refreshtokenverify;
