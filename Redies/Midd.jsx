const jwt = require('jsonwebtoken');
const RedisClient = require("./configRedis/Redies.jsx");
const Data = require("./Need.jsx");


const Midd = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token is not predent");

    }

    const payload = jwt.verify(token, process.env.MURGA);

    const { email } = payload;

    if (!email) {
      throw new Error("IEmail missing");

    }

    const result = await Data.findOne({ email });

    if (!result) {
      return res.status(401).send({
        message: "Authentication Failed: User not found",
        details: "No user found with the provided token."
      });
    }

    const IsBlocked = await RedisClient.exists(`token:${token}`);

    if (IsBlocked) {
      throw new Error("Invalid Token");

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