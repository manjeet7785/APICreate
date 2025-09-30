const Validate = require("validator");



function valid(data) {

  const mandantry = ["firstName", "age", "email", "password"];

  const IsAllowed = mandantry.every((k) => Object.keys(data).includes(k));


  if (!IsAllowed) {
    throw new Error("Fields Missing");
  }



  if (!Validate.isEmail(data.email)) {
    throw new Error("Enter the Right email otherwise i block your your id");
  }



  return true;

}

module.exports = valid;




//isme validating kiya hun main 