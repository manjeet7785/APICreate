const Express = require("express");
const bcrypt = require("bcrypt");
const valid = require("../Checker.jsx")
const Midd = require("../Midd.jsx")
const Collect = require("../Need.jsx");
const RedisClient = require("../configRedis/Redies.jsx");
const jwt = require('jsonwebtoken');

const authRouter = Express.Router();

authRouter.post("/signup", async (req, res) => {

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


authRouter.post("/login", async (req, res) => {

  try {
    const people = await Collect.findOne({ email: req.body.email });


    // if (!(req.body.email === people.email))
    // throw new Error("Invalid Creadentials");

    const isAllowed = await people.verifyPassword(req.body.password);

    if (!isAllowed) {
      throw new Error("Please Check your Emaill and Password")
    }


    const token = people.getJWT();
    res.cookie("token", token);
    res.send("Login Successfully")
  }
  catch (err) {
    res.send("Error ::-" + err.message);
  }
})


//redis ke db main ab blocked token 
// token :exp 

authRouter.post("/logout", Midd, async (req, res) => {


  try {

    const { token } = req.cookies;
    console.log("Token ::", token);



    const payload = jwt.decode(token);
    console.log(payload);




    await RedisClient.set(`token:${token}`, "breksjsk");







    res.cookie("token", null, { expires: new Date(Date.now()) });
    res.send("Logout Successfully")

  }

  catch (err) {
    res.send("Error ::-" + err.message);
  }
})

module.exports = authRouter;



// inko 78 line to 85 line 


    // total time leave == ye current time se leke given time tk krega

    // await RedisClient.expire(`token:${token}`, 1800);

    // ye mili second tk valid rhta hai logout ke baad 
    // await RedisClient.expireAt(`token:${token}`);
