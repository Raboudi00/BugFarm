const jwt = require("jsonwebtoken");
const User = require("../Models/User");
require("dotenv").config();
const jwt_secret = process.env.JWT_SECERT;

const isAuth = (req, res, next) => {
  if (!req.headers.authorization) return res.status(401).send("error 1");
  const token = req.headers.authorization.split(" ");
  if (token.length !== 2 || token[0] !== "Bearer")
    return res.status(401).send("error 2");

  jwt.verify(token[1], jwt_secret, function (err, decoded) {
    if (err) return res.status(401).send("error 3");
    User.findById(decoded.id)
      .then((user) => {
        if (!user) return res.status(401).send("error 4");
        req.user = user;
        next();
      })
      .catch(() => {
        res.status(500).send();
      });
  });
};

module.exports = { isAuth };
