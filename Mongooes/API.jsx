const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema({
  name: String,
  age: Number,
  Location: String
});

const User = mongoose.model("user", userSchema);

module.exports = User;
