const express = require("express");
const bcrypt = require("bcrypt");
const Collect = require("../../Need.jsx")

const authRouter = require("../auth.jsx");
const Midd = require("../../Midd.jsx");
const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {

  try {

    valid(req.body);
    //Converting password into hashing
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await Collect.create(req.body);

    res.send("User Register  sign");
  }
  catch (error) {
    res.status(400).send({ // Use a 400 status code for bad requests
      message: "Validation failed:",
      details: error.message
    });
  }

})



// userRouter.post("/", async (req, res) => {

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

userRouter.get("/", Midd, async (req, res) => {
  try {

    // ye pya koi result hai hi nhi isliye ab result ko midd se leke aayenge
    res.send(req.result);



  } catch (err) {
    res.send({
      message: "this is the error",
      details: err.message
    })
  }
})

userRouter.delete("/:id", Midd, async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


userRouter.patch("/:id", Midd, async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body, { "runValidators": true });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }
});

// app.get("/token", (req, res) => {

//   try {
//     res.send("This is the result", req.result)
//   }
//   catch (err) {
//     res.send(err.message)
//   }
// })


module.exports = userRouter;