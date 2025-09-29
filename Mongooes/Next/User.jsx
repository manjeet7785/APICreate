// const e = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: {
    type: String,

  },
  lastName: {
    type: String,
  },
  age: {
    type: Number,
    min: 15,
    max: 70
  },
  location: {
    type: String,
  },
  gender: {
    type: String,
    required: true,
    validate(value) {
      const allowedGenders = ["Male", "Female", "Other"];
      return allowedGenders.includes(value);
    }
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
    immutable: true,
  },
  password: {
    type: String,
    required: true,
    min: 8,
    max: 15
  },
  photo: {
    type: String,
    default: "https://www.shutterstock.com/image-vector/user-icon-trendy-flat-style-260nw-418179865.jpg"
  }

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User;