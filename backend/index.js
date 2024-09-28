const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bookRouter = require("./routers/book.router");
const db = require("./models");
const role = require("./models/role.model");
const authRouter = require("./routers/auth.router");

// กำหนดค่า CORS ให้อนุญาตหลาย origin
const corsOptions = {
    origin: ["https://midterm65.vercel.app/"],
    // methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,  // ถ้าคุณมีการใช้ cookies หรือ authentication tokens
   // allowedHeaders: ["Content-Type", "x-access-token","Authorization"], // อนุญาตให้ส่งโทเค็น
  };

// Dev mode
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop & sync database!");
// });

// const initRole = () => {
//   role.create({ id: 1, roleName: "user" });
//   role.create({ id: 2, roleName: "admin" });
// };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// use router http://localhost:5000/api/v1/auth
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
  res.send("<h1>Hello Backend</h1>");
});

app.listen(PORT, () => {
  console.log("Listening to http://localhost:" + PORT);
});
