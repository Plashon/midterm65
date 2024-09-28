const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bookRouter = require("./routers/book.router")
const authRouter = require("./routers/auth.router")
const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
const corsOptions = {
    origin: process.env.corsConnect,
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Allow preflight requests for all routes
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
