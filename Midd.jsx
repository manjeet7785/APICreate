const jwt = require('jsonwebtoken');

const Data = require("./Need.jsx");


const Midd = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    const payload = jwt.verify(token, process.env.MURGA);
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