require("dotenv").config();

const express = require("express");
const app = express(); //Instanciando o servidor
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");

// Database setup
mongoose.connect(
    process.env.MONGO_URL, 
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev")); //lib de log
app.use("/files", express.static(path.resolve(__dirname, "..", "tmp", "uploads")));

app.use(require("./routes"));

app.listen(3000);