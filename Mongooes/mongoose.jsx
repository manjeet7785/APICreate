const mongoose = require('mongoose');
const { Schema } = mongoose;

async function main() {
  await mongoose.connect("mongodb+srv://admin:Raja1234%40%40@manjeet.jihoesr.mongodb.net/BookStore");
  // console.log("Mongoose Connected");

  // const userSchema = new Schema({
  //   name: String,
  //   age: Number,
  //   Location: String
  // });


  // const User = mongoose.model('user', userSchema);

  // const user1 = new User({ name: "Alice", age: 28, Location: "Canada" });
  // await user1.save();
  // console.log("User saved:", user1);


  // console.log("Finding all users...");


  // await User.updateOne({ name: "Alice" }, { $set: { age: 29, Location: "Toronto" } });
  // console.log("User updated");



  // const ans = await User.find({});
  // console.log("All users:", ans);


  // const name = await User.find({ Location: "Toronto" });
  // console.log("Users located in Toronto:", name);

}



// main()
//   .then(() => console.log("Mongoose Connected"))
//   .catch(err => console.error("Mongoose connection error:", err));


module.exports = main;


