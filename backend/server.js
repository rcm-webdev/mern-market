//express is a powerful web framework for node.js
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

//dotenv is a module that loads env variables from the .env file in the config directory
require("dotenv").config({path: "./config/.env"});

//middleware to parse json bodies. This will essentially allow us to get req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(
  {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }
));

//handle routes
app.use("/api/notes", require("./routes/notes"));
app.use("/api/users", require("./routes/userRoutes"));


//connect to db and then start the server. 
//if we don't connect to db, the server will not start
connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}. You better go catch it!`);
  });
})