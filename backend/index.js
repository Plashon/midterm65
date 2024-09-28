const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bookRouter = require("./routers/book.router")
const authRouter = require("./routers/auth.router")
const app = express();
const PORT = process.env.PORT || 5000;
const role = require("./models/role.model")

const corsOptions = {
    origin: "https://midterm65.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    optionSuccessStatus:200,
};


// Dev mode
// db.sequelize.sync({ force: true }).then(() => {
//   initRole();
//   console.log("Drop & sync database!");
// });

const initRole = () => {
    role.create({ id: 1, roleName: "user" });
    role.create({ id: 2, roleName: "admin" });
  };

app.use(cors(corsOptions));
app.use(cors({ origin: '*' }));
// app.options("*", cors(corsOptions)); // Allow preflight requests for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/v1/book", bookRouter);
app.use("/api/v1/auth", authRouter);

// Test endpoint
app.get("/", (req, res) => {
  res.send("<h1>Hello Backend</h1>");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});
