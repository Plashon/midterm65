const Book = require("../models/book.model");
const { Op } = require("sequelize");
const db = require("../models");
const Type = db.Type;

//create a new book
exports.create = async (req, res) => {
  const { image,bookName,bookType, description, writer, price } = req.body;

  const newBook = {
    image,
    bookName,
    bookType,
    description,
    writer,
    price,
  };

  await Book.create(newBook)
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while saving the Financial record!",
      });
    });
};

//retrieve all book
exports.getAll = async (req, res) => {
  await Book.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while getting a book Record",
      });
    });
};

//retrieve a Book by id
exports.getById = async (req, res) => {
  const id = req.params.id;
  await Book.findByPk(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "No found Restaurant with ID : " + id,
        });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while getting the financial Record!",
      });
    });
};

// retrieve a bool  by User Id
exports.getByUserId = async (req, res) => {
  const userId = req.params.userId;
  await Book.findAll({ where: { userId: userId } })
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occurred while getting a book Record!",
      });
    });
};

//Edit  a book by Id
exports.updateById = async (req, res) => {
  const id = req.params.id;
  await Book.update(req.body, { where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Record was update successfully!" });
    } else {
      res.send({
        message:
          "Can't update Record with ID : " +
          id +
          ". Maybe financial Record wasn't found or req.body is empty!",
      });
    }
  });
};

//delete a financial by Id
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  await Book.destroy({ where: { id: id } }).then((num) => {
    if (num == 1) {
      res.send({ message: "Book was delete successfully!" });
    } else {
      res.send({ message: "Can't delete Book ID : " + id + "." });
    }
  });
};
