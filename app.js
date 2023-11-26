require("dotenv").config({ path: "./config/.env" });
const express = require("express");
const logger = require("morgan");
const session = require("express-session");

const app = express();

const todoRoutes = require("./routes");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    }),
);


PORT = process.env.PORT || 3001;

app.get("/", (req, res) => {
    res.send("Hello World");
});

// use auth routes
app.use("/shawty", todoRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
