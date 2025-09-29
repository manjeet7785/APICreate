const jwt = require('jsonwebtoken');

const Data = require("./UserData.jsx");

// const Midd = async (req, res, next) => {
// try {
//   const { token } = req.cookies;
//   if (!token) {
//     throw new Error("Token Does't Exit");
//   }

//   const payload = jwt.verify(token, "Manjeet123");

//   const { email } = payload;

//   if (!email) {
//     throw new Error("Email is missing");
//   }
//   const result = await Data.find();

//   if (!result) {
//     throw new Error("This is th result");
//   }

//   // jb mai result ko nikal liye to ussko result ke sath combine krskts hun
//   req.result = result;
//   //jb user authenticate ho gya to next pya chla jayega
//   next();

const Midd = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const payload = jwt.verify(token, "Manjeet123");
    const { email } = payload;
    const result = await Data.findOne({ email });

    if (!result) {
      return res.status(401).send({
        message: "Authentication Failed: User not found",
        details: "No user found with the provided token."
      });
    }
    req.result = result;
    next();
  }

  catch (error) {
    res.send(
      {
        message: "This is the eror",
        details: error.message
      }
    );
  }
}


module.exports = Midd;