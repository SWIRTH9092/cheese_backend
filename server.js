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
mongoose.set("strictQuery", false);
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

//  Cheese Index Route
app.get("/cheese", async (req, res) => {
    try {
        // send all cheeses
        res.json(await Cheese.find({}));
    }  catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Cheese Create Route
app.post("/cheese", async (req, res) => {
    try {
        //  create cheese
        res.json (await Cheese.create(req.body));
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
});

// Cheese Update Route
app.put("/cheese/:id", async (req, res) => {
    try {
        //  update cheese
        console.log (req.params.id, req.body)
        res.json (
            await Cheese.findByIdAndUpdate(req.params.id, req.body, {new: true}));
    } catch (error) {
        //send error
        res.status(400).json(error)
    }
});

// Cheese Delete Route
app.delete("/cheese/:id", async (req, res) => {
    try {
        // send cheese to delete
        res.json(await Cheese.findByIdAndRemove(req.params.id))
    } catch (error) {
        //send error
        res.status(400).json(error);
    }
});

// Cheese Index Route
app.get("/cheese/:id", async (req, res) => {
    try {
        res.json(await Cheese.findById(req.params.id));
    } catch (error) {
        //send error
        res.status(400).json(error);
    }

});

//--------------------------------------------
//  Listner
//--------------------------------------------
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`))