const express = require("express");
const Handlebars = require('handlebars')
const exphbs = require("express-handlebars");
const connectDatabase = require("./helpers/database/connectDatabase")
const main = require("./routes/main")
const posts = require("./routes/posts")
const users = require("./routes/users")
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const fileUpload = require('express-fileupload')
const generateDate = require('./helpers/date/generateDate').generateDate
const expressSession = require('express-session')
const connectMongo = require('connect-mongo')

const app = express();

//MongoDb Connection
connectDatabase();

const mongoStore = connectMongo(expressSession)

// session
app.use(expressSession({
  secret: 'keyboard-secret',
  resave: false,
  saveUninitialized: true,
  store: new mongoStore({ mongooseConnection : mongoose.connection})
}))

// Flash Messages Middleware
app.use((req, res, next) => {
  res.locals.sessionFlash = req.session.sessionFlash;
  delete req.session.sessionFlash;
  next();
})

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;


app.use(express.static("public"));


// fileUpload
app.use(fileUpload());

// handlebars
app.engine("handlebars", exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: {generateDate:generateDate}
}), exphbs());

app.set("view engine", "handlebars");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


// Routers Middleware
app.use('/', main)
app.use('/posts', posts)
app.use('/users', users)



app.listen(port, hostname, () => {
  console.log(`App started on http://${hostname}:${port}/`);
});
