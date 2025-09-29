const Express = require("express");
const mongoose = require("mongoose");
const main = require("./Database.jsx");
const Data = require("./UserData.jsx");
const valid = require("./validatorUser.jsx");
const bcrypt = require("bcrypt");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Midd = require("./middleware.jsx")
const app = Express();

const port = 2000;

app.use(Express.json());
app.use(cookieParser())


app.post("/signup", Midd, async (req, res) => {

  try {
    //validate kiya hun 
    valid(req.body);

    //Converting password into hashing
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await Data.create(req.body);

    res.send("User Register  sign");
  }
  catch (error) {
    res.status(400).send({ // Use a 400 status code for bad requests
      message: "Validation failed:",
      details: error.message
    });
  }

})



app.post("/login", Midd, async (req, res) => {
  try {
    const people = await Data.findOne({ email: req.body.email });
    if (!(req.body.email === people.email))
      throw new Error("Invalid Creadentials");

    const Allowed = await bcrypt.compare(req.body.password, people.password);

    if (!Allowed) {
      throw new Error("Invalid Credentents")
    }


    const token = jwt.sign({ email: people.email }, "Manjeet")
    res.cookie("token", token);
    res.send("Login Successfully")
  }
  catch (err) {
    res.send("Error ::-" + err.message);
  }
})


app.post("/oneuser", Midd, async (req, res) => {
  try {
    const people = await Data.findById(req.body.email);
  }
  catch (err) {
    res.send("this the error")
  }
})


app.delete("/reg/:id", Midd, async (req, res) => {
  try {
    const id = req.params.id;

    await Data.findByIdAndDelete(id);
    res.send("User Deleted Successfully");
  }
  catch (error) {
    res.send({
      message: "this is the msg",
      details: error.message
    })
  }
})

// app.get("/reg", async (req, res) => {
//   try {
//     const { token } = req.cookies;
//     //validate the user
//     //payload return krega

//     const payload = jwt.verify(token, "Manjeet")
//     // isko aise bhi likh skte hai ||
//     // const payload = jwt.verify(req.cookies.token, "Manjeet") // user ko check krega ki user valid hai ki nhi 

//     const { email } = payload;

//     if (!email) {
//       throw new Error("This is the cookies id and eroror");

//     }

//     console.log(payload);

//     const data = await Data.find();
//     res.send(data)
//     console.log(req.cookies);

//     // res.send("data coming soon")
//   }
//   catch (error) {
//     res.send({
//       message: "This is the error ",
//       details: error.message
//     })
//   }
// })

app.get("/reg", Midd, async (req, res) => {
  try {

    res.send(req.result);  //sara data req me aa gya hai ab to sida nikal skte hai
  }
  catch (error) {
    res.send({
      message: "This is the error ",
      details: error.message
    })
  }
})




main()
  .then(async () => {
    console.log("Mongoose Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });


  })



  .catch(err => console.error("Mongoose connection error:", err));

