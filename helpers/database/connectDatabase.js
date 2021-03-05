const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose.connect(`mongodb://${process.env.HOSTNAME}/nodeblog`, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })    .then(() => {
    console.log('MongoDb Connection Successful');
  })
  .catch((err) => {
    console.log(err);
  })
};

module.exports = connectDatabase