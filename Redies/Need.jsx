const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");

const jwt = require('jsonwebtoken');



const needSchema = new Schema({
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




needSchema.methods.getJWT = function () {
  const ans = jwt.sign({ email: this.email }, process.env.MURGA);
  return ans;
}
needSchema.methods.verifyPassword = async function (UserPassword) {
  const ans = await bcrypt.compare(UserPassword, this.password)
  return ans;
}

const Collect = mongoose.model("DataStore", needSchema);
module.exports = Collect;
