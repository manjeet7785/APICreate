const validator = require("validator");

function validateUserData(data) {
  // API LEVEL VALIDATION 
  const mondatory = ['firstName', 'emailId', 'age'];

  // const IsAllowed = Object.keys(data).every((keys) => mondatory.includes(keys));

  const IsAllowed = mondatory.every((keys) => Object.keys(data).includes(keys));

  if (!IsAllowed)
    throw new Error("Fild missing")

  if (!validator.isEmail(String(data.emailId))) {
    console.log("Function run");

    throw new Error("Invalid Email");

    console.log("Funnnnnnnn");

  }


  //Password validation
  //name character minimum = 3 and email id ko api level pya validate kr skta hun
}
module.exports = validateUserData;