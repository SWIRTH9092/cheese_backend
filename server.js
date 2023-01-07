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