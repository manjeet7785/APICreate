const Express = require("express");
const mongoose = require("mongoose");
const app = Express();
const main = require('./Database.jsx');
const User = require('./User.jsx');
const bcrypt = require("bcrypt");
const validator = require("validator");
app.use(Express.json());

// TimeStamp: 2024-10-03 12:00:00
// CRUD Operations

app.post('/register', async (req, res) => {

  try {

    // API Level validation 
    //req.body ke under data aaya hai,usmain first_name and emailId,age present hona chahiye kyuki without iske ye nhi chlega


    const mandatoryField = ["firstName", "email", "age"];


    const IsAllowed = mandatoryField.every((k) => Object.keys(req.body).includes(k));

    console.log(IsAllowed);

    if (!IsAllowed) {
      throw new Error("Fields Missing");

      // // Validate email format
      // if (!validator.isEmail(req.body.email)) {
      //   return res.status(400).send({ message: "Invalid email format" });
      // }
    }

    await User.create(req.body);
    res.send("User Registered Successfully");


  }
  catch (err) {
    res.status(500).send({
      message: "Please provide all the details",
      details: err.message
    });
  }

});


// // app.post('/login', async (req, res) => {

// //   try{
// //       const people = await User.findById(req.body._id);


// //   if (!(req.body.email === people.email)) {
// //     throw new Error("Invalid Password");
// //     return;
// //   }

// //   const IsAllowed = await bcrypt.compare(req.body.password, people.password);

// //   if (!IsAllowed) {
// //     throw new Error("Invalid Credentials");

// //   }

// //   // JWT  Token

// //   res.cookie("token", "manjeetmaurya");
// //   res.send("Login Successfully");

// // }
// catch(err){
//   res.send({
//     message:"Error",
//     details:err.message
//   })
// }
//   }
// )


app.get('/users', async (req, res) => {

  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }

});

// app.get("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const fetch = await User.findById(id);
//     res.send(fetch);
//   }
//   catch (err) {
//     res.status(500).send("Internal Server Error");
//   }
// })

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body, { "runValidators": true });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }
});







const port = 3000;

main()
  .then(async () => {
    console.log("Mongoose Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });


  })



  .catch(err => console.error("Mongoose connection error:", err));


