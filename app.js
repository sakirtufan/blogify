const express = require("express");
const Handlebars = require('handlebars')
const exphbs = require("express-handlebars");
const connectDatabase = require("./helpers/database/connectDatabase")
const main = require("./routes/main")
const posts = require("./routes/posts")
require("dotenv").config();
const bodyParser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const fileUpload = require('express-fileupload')

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const app = express();

app.use(express.static("public"));

//MongoDb Connection
connectDatabase();

// fileUpload
app.use(fileUpload());

// handlebars
app.engine("handlebars", exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}), exphbs());
app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Routers Middleware
app.use('/', main)
app.use('/posts', posts)



app.listen(port, hostname, () => {
  console.log(`App started on http://${hostname}:${port}/`);
});
