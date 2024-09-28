const authController = require("../controllers/auth.controller");
const express = require("express");
const router = express.Router();
const { verifySignUp } = require("../middlewares");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

// register
router.post(
  "/register",
  [verifySignUp.checkDuplicatedUserOrEmail],
  authController.register
);
// login
router.post("/login", authController.login);

module.exports = router;
