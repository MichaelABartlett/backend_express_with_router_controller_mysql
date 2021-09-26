

const express = require("express");

let env = require("dotenv").config();

let app = express();
// enable the application to be able to parse JSON bodies in post/put
app.use(express.json());

require("./example/db");


// selecting the port to use
let port = process.env.PORT;

// connect to static content
app.use(express.static("./public")); // this is not in use yet


// add routes here

let exampleRoute = require("./example/route");
app.use(exampleRoute);

// add more routes here




// this is not in use anymore
//const port = process.env.PORT || 4001; // setting the part we are using

app.listen(port, () => {
    console.log(`Web server is listening on port ${port}!`); // console log what port we are using
})


