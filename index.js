require('dotenv').config();

const {StoreCX} = require("@VanillaCX/Store");

const express = require("express");
const helmet = require("helmet");

// Entry point routes

// Set port the app listens to
const port = process.env.PORT || 3010;

// Create app
const app = express();

// Set Helmet usage for security
app.use(helmet());

// Remove fingerprinting of the Server Software
app.disable('x-powered-by');

// Set EJS as templating engine  
app.set('view engine', 'ejs');  

// Enables static access to filesystem
app.use('/public', express.static('public'));

// Mongo DB Session Storage
app.use(StoreCX.session)

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// Parse application/json
app.use(express.json());

// Middleware for all requests
app.use(async (req, res, next) => {
    console.log(req.session);
    next();
})

// Setup entry point routing

app.get("/", (res, req) => {
    console.log("TEST")
    res.send("Hello")
})

// Fallback for un-matched requests
app.use((req, res) => {
    // Requested resource doesnt exist. Return a 404
    const resourceErr = "404";

    res.status(404)
       .render("common/errors/resource", {resourceErr})
})

app.listen(port, () => console.log(`Server listening on port: ${port}`));