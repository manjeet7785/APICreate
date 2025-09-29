const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');



const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,

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


// userSchema.methods.getJWT = function () {
//   const ans = jwt.sign({ email: this.email }, "Manjeet") //people ke place pya this keyword ka use krte hai
//   return ans;
// }

// userSchema.methods.verifyPassword = async function (userPassword) {
//   const password = await bcrypt.compare(userPassword, this.password);

//   return password;
// }

const Data = mongoose.model("DataStore", userSchema);

module.exports = Data; 