const Bcrypt = require("bcrypt");

const password = "Manjeet123@@";

// hashcode + salt 
async function hashing() {
  // console.time("hash ");
  const hashpass = await Bcrypt.hash(password, 10);


  console.log("This is inside function", hashpass);

  // console.timeEnd("hash");


}

hashing();


// const hashpass = Bcrypt.hash(password, 10);
// console.log("This is the password", hashpass);