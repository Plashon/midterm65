const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

// verify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    res.status(403).send({ message: "No tokens are provided" });
    return;
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

// check user is admin role
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName === "admin") {
          next();
          return;
        }
      }
      res.status(401).send({ message: "Administrator role required!" });
    });
  });
};



const authJwt = {
  verifyToken,
  isAdmin,
};

module.exports = authJwt;
