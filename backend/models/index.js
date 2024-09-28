const User = require("./user.model");
const Role = require("./role.model");
const sequelize = require("./db");
const Sequelize = require("sequelize");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = User;
db.Role = Role;

db.User.belongsToMany(db.Role, {
  through: "user_Roles",
});
db.Role.belongsToMany(db.User, {
  through: "user_Roles",
});

module.exports = db;
