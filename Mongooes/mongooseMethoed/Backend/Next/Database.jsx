const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
  await mongoose.connect("mongodb+srv://admin:Raja1234%40%40@manjeet.jihoesr.mongodb.net/instagram");

}

module.exports = main;