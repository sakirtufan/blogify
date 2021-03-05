const express = require("express");
const exphbs = require("express-handlebars");
const connectDatabase = require("./helpers/database/connectDatabase")
const routers = require("./routes/main")
require("dotenv").config();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

const app = express();

// handlebars
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.use(express.static("public"));

// Routers Middleware
app.use('/', routers)

//MongoDb Connection
connectDatabase();


app.listen(port, hostname, () => {
  console.log(`App started on http://${hostname}:${port}/`);
});
