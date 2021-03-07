const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: [true],
    unique: [true, "Please try different email"], //bir emailin sadece bir kayit icin kullanilmasi
    match: [
      /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
      "Please provide a valid email",
    ],
  },
  password: {
    type: String,
    minlength: [6, "Please provide a password with min length 6"],
    required: [true, "Please provide a valid password"]//userlara getrequest yapildiginda passwordun görünmemesi icin
  },
});



module.exports = mongoose.model("User", UserSchema);
