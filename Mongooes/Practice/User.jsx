const mongooes = require("mongoose");
const { Schema } = mongooes;


const DataCollection = new Schema({
  firstName: {
    type: String,
    trim: true

  },
  lastName: {
    type: String,

    trim: true
  },
  age: {
    type: Number,
    min: 15,
    max: 70
  },
  location: {
    type: String,

    trim: true
  },
  gender: {
    type: String,

    trim: true
  },
  emailId: {
    type: String,
    unique: true,
    sparse: true,
    trim: true
  }
  ,
  Password: {
    type: String,
    // required: true,
    min: 8,
    max: 15
  }

}, { timestamps: true });

const User = mongooes.model("Collection", DataCollection);

module.exports = User;