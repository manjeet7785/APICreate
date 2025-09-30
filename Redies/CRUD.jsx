const Express = require("express");
const mongoose = require("mongoose");
const main = require("./Database.jsx");
const Collect = require("./Need.jsx")
const valid = require("./Checker.jsx");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Midd = require("./Midd.jsx")
const authRouter = require('./root/auth.jsx');
const userRouter = require("./root/Users/UserAuth.jsx");
const commentRouter = require("./root/comment/Comment.jsx")
const RedisClient = require("./configRedis/Redies.jsx")
const app = Express();


require("dotenv").config()

//isse dotenv ko hamesha save krke rkhte hai
// console.log(process.env);



app.use(Express.json());
app.use(cookieParser())

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.use("/comment", commentRouter);

// app.post("/signup", async (req, res) => {

//   try {

//     valid(req.body);
//     //Converting password into hashing
//     req.body.password = await bcrypt.hash(req.body.password, 10);
//     await Collect.create(req.body);

//     res.send("User Register  sign");
//   }
//   catch (error) {
//     res.status(400).send({ // Use a 400 status code for bad requests
//       message: "Validation failed:",
//       details: error.message
//     });
//   }

// })


// app.post("/login", async (req, res) => {

//   try {
//     const people = await Collect.findOne({ email: req.body.email });


//     // if (!(req.body.email === people.email))
//     // throw new Error("Invalid Creadentials");

//     const isAllowed = await people.verifyPassword(req.body.password);

//     if (!isAllowed) {
//       throw new Error("Please Check your Emaill and Password")
//     }


//     const token = people.getJWT();
//     res.cookie("token", token);
//     res.send("Login Successfully")
//   }
//   catch (err) {
//     res.send("Error ::-" + err.message);
//   }
// })

// app.delete("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     await User.findByIdAndDelete(id);
//     res.send("User Deleted Successfully");
//   } catch (err) {
//     res.status(500).send("Internal Server Error");
//   }
// });


// app.patch("/users/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     await User.findByIdAndUpdate(id, req.body, { "runValidators": true });
//     res.send("User Updated Successfully");
//   } catch (err) {
//     res.status(500).send("Internal Server Error", err);
//   }
// });




// app.get("/users", Midd, async (req, res) => {
//   try {

//     // ye pya koi result hai hi nhi isliye ab result ko midd se leke aayenge
//     res.send(req.result);



//   } catch (err) {
//     res.send({
//       message: "this is the error",
//       details: err.message
//     })
//   }
// })

// app.get("/token", (req, res) => {

//   try {
//     res.send("This is the result", req.result)
//   }
//   catch (err) {
//     res.send(err.message)
//   }
// })


const InitlizeConnection = async () => {
  try {
    // await RedisClient.connect();
    // console.log("Connected Successfully");

    // await main();
    // console.log("Connected To DB SuccessFully");

    await Promise.all([RedisClient.connect(), main()]);
    console.log("this is the connection");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on http://localhost: ${process.env.PORT}`);
    });

  }
  catch (err) {
    console.log("Error : " + err);

  }
}

InitlizeConnection();



// main()
//   .then(async () => {
//     console.log("Redis Connect to the Redies ");

//     console.log("Mongoose Connected to MongoDB");
//     app.listen(process.env.PORT, () => {
//       console.log(`Server is running on http://localhost: ${process.env.PORT}`);
//     });


//   })



//   .catch(err => console.error("Mongoose connection error:", err));


