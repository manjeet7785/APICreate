const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require("./functionHome.jsx");

async function Practice() {
  await mongoose.connect("mongodb+srv://admin:Raja1234%40%40@manjeet.jihoesr.mongodb.net/check");

}

module.exports = Practice;
