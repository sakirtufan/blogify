const express = require("express")
const path = require("path")
const exphbs  = require('express-handlebars')
require('dotenv').config()

const app = express();

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('site/index');
})

app.get('/about', (req, res) => {
  res.render('site/about');
})

app.get('/blog', (req, res) => {
  res.render('site/blog');
})







app.listen(port,hostname, () => {
  console.log(`App listening at http://${hostname}:${port}/`);
});
