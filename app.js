const express = require("express");
const Handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const connectDatabase = require("./helpers/database/connectDatabase");
require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const fileUpload = require("express-fileupload");
const generateDate = require("./helpers/date/generateDate").generateDate;
const limit = require("./helpers/limit").limit;
const truncate = require("./helpers/truncate").truncate;
const expressSession = require("express-session");
const connectMongo = require("connect-mongo");
const methodOverride = require('method-override')

const app = express();

//MongoDb Connection
connectDatabase();

const mongoStore = connectMongo(expressSession);

// session
app.use(
  expressSession({
    secret: "keyboard-secret",
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({ mongooseConnection: mongoose.connection }),
  })
);


const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.static("public"));

// fileUpload
app.use(fileUpload());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))


app.engine(
  "handlebars",
  exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: { generateDate: generateDate, limit: limit, truncate: truncate},
  }),
  exphbs()
  );
  
  app.set("view engine", "handlebars");
  
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: false }));
  
  // parse application/json
  app.use(bodyParser.json());
  
  // Display Link Middleware
  app.use((req, res, next) => {
    const { userId } = req.session;
    if (userId) {
      res.locals = {
        displayLink: true,
      };
    } else {
      res.locals = {
        displayLink: false,
      };
    }
    next();
  });
  
  // Flash Messages Middleware
  app.use((req, res, next) => {
    res.locals.sessionFlash = req.session.sessionFlash;
    delete req.session.sessionFlash;
    next();
  });
  
// Routers Middleware
const main = require("./routes/main");
const posts = require("./routes/posts");
const users = require("./routes/users");
const admin = require("./routes/admin/index");

app.use("/", main);
app.use("/posts", posts);
app.use("/users", users);
app.use("/admin", admin)

app.listen(port, hostname, () => {
  console.log(`App started on http://${hostname}:${port}/`);
});
