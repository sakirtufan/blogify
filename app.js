const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
require("dotenv").config();
const mongoose = require("mongoose");
const main = require("./routes/main")

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

mongoose.connect(`mongodb://${hostname}/nodeblog`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));
// middleware routes
app.use('/',main)


app.listen(port, hostname, () => {
  console.log(`App listening at http://${hostname}:${port}/`);
});
