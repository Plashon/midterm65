const sequelize = require("./db");
const { DataTypes } = require("sequelize");

const Book = sequelize.define("book", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  image:{
    type:DataTypes.STRING,
    allowNull:false,
  },
  bookType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bookName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  writer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
});
Book.sync({ force: false })
  .then(() => {
    console.log("Table created or already exists");
  })
  .catch((error) => {
    console.log("Error creating book table : ", error);
  });

module.exports = Book;
