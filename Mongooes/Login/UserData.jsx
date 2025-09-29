const mongoose = require("mongoose");
const { Schema } = mongoose;


const userSchema = new Schema({
  firstName: {
    Type: String,
  },
  lastName: {
    Type: String,

  },
  age: {
    type: String,
    required: true,

  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  password: {
    type: String,

  }

}, { timestamps: true });


const Data = mongoose.model("DataStore", userSchema);

module.exports = Data; 