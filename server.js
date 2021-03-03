const express = require("express")
require('dotenv').config()



const app = express();

const port = process.env.PORT;
const hostname = process.env.HOSTNAME;

app.get('/', (req, res) => {
  res.send('Welcome to my Blog')
});


app.listen(port,hostname, () => {
  console.log(`App listening at http://${hostname}:${port}/`);
});
