//--------------------------------------------
//  Dependenices
//--------------------------------------------
// get .env variables
require("dotenv").config()
// pull Port from .env, give deafault value of 4000
const { PORT = 4000, DATABASE_URL } = process.env;

//import express
const express = require("express");

// create application object
const app = express ();

//import mongoose
const mongoose = require("mongoose");

//import middleware
const cors = require("cors");
const morgan = require("morgan");

//--------------------------------------------
//  Database Connection
//--------------------------------------------
//  Establish connnection
mongoose.connect(DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

//connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("Your are disconnected from mongoose"))
    .on("error", (error) => console.log(error));
    

//--------------------------------------------
//  Database Model
//--------------------------------------------
const CheeseSchema = new mongoose.Schema ({
    name: String,
    countryOfOrigin: String,
    image: String
})

const Cheese = mongoose.model("Cheese", CheeseSchema);

//--------------------------------------------
//  Middleware
//--------------------------------------------
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//--------------------------------------------
//  Routes
//--------------------------------------------
// create test route
app.get("/", (req, res) => {
    res.send("hello world");
});

//--------------------------------------------
//  Listner
//--------------------------------------------
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))