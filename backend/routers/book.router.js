const express = require("express");
const router = express.Router();
const bookController = require("../controllers/book.controller");
const { authJwt } = require("../middlewares");


//create a new book Router
router.post("/",[authJwt.verifyToken,authJwt.isAdmin],bookController.create)
//retrieve all book 
router.get("/",bookController.getAll);
//retrieve a book by id 
router.get("/:id",[authJwt.verifyToken],bookController.getById)
//Edit  a book by Id 
router.put("/:id",[authJwt.verifyToken,authJwt.isAdmin],bookController.updateById)
//delete a book by Id 
router.delete("/:id",[authJwt.verifyToken,authJwt.isAdmin],bookController.deleteById)


module.exports = router;