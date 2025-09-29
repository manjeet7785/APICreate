const jwt = require('jsonwebtoken');
const Data = require("./UserData.jsx");
const Salt = "Manjeet123@!";

const Midd = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    // Agar token user ne nhi bheja tab (Yeh wahi line hai jahan se "Invalid data" error aata hai)
    if (!token) {
      // ✅ IMPROVED ERROR CODE: Security ke liye 401 status use karein.
      return res.status(401).send({
        message: "Authentication Failed",
        details: "Token is missing. Please log in."
      });
    }

    const payload = jwt.verify(token, Salt);
    const { email } = payload;

    if (!email) {
      throw new Error("Token is corrupted: Email is missing");
    }

    // ✅ FIX 2 APPLIED: Mongoose query ko object ke saath theek kiya
    const result = await Data.findOne({ email });

    if (!result) {
      throw new Error("User corresponding to token not found.");
    }

    req.result = result;
    next();
  }
  catch (err) {
    // Token verification ya DB error ko catch karta hai
    res.status(401).send({
      message: "Authentication Error",
      details: err.message
    });
  }
}

module.exports = Midd;