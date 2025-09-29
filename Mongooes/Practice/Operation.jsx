const Express = require("express");
const app = Express();
const DataSrore = require("./DataStore.jsx")
const User = require('./User.jsx');
const Practice = require("./DataStore.jsx");
const bcrypt = require("bcrypt")
const validateUserData = require("./functionHome.jsx");

app.use(Express.json());


app.post("/instadata", async (req, res) => {
  try {

    validateUserData(req.body);
    // password ko bcrypt me convert krne ke liye 
    req.body.Password = await bcrypt.hash(req.body.Password, 10);

    await User.create(req.body);

    res.status(201).send("Data Thanks");
  }
  catch (error) {
    res.send({
      message: "Somethings Error",
      details: error.message
    })
  }
})

app.post("/Register", async (req, res) => {
  try {

    validateUserData(req.body);
    // password ko bcrypt me convert krne ke liye 
    req.body.Password = await bcrypt.hash(req.body.Password, 10);

    await User.create(req.body);

    res.status(201).send("Registration Successfull");
  }
  catch (error) {
    res.send({
      message: "Somethings Error",
      details: error.message
    })
  }
})

app.post("/login", async (req, res) => {

  try {

    // Validate kiya or id se user ko nikal liya bahar or pir check kr rhe hai
    const people = await User.findOne({ emailId: req.body.emailId })

    if (!(req.body.emailId === people.emailId)) {
      throw new Error("Invalid Password");
    }

    const IsAllowed = await bcrypt.compare(req.body.Password, people.Password);

    if (!IsAllowed) {
      throw new Error("Invalid ");

    }

    res.send("Login Successfully");

  }
  catch (err) {
    res.send({
      message: "Try Again",
      details: err.message
    })
  }

})




app.patch("/instacorrection/:id", async (req, res) => {

  const id = req.params.id;
  const updateData = req.body;
  console.log(id);

  try {

    const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });


    if (!updatedUser) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send(updatedUser);

  } catch (error) {
    console.error("Update error:", error);
    res.status(500).send({ error: "Failed to update user", details: error.message });
  }
});

app.delete("/instaDelete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


app.put('/instaupdate/:id', async (req, res) => {
  const id = req.params.id;
  const replacementData = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, replacementData, {
      new: true
    })
    res.send(updatedUser)
  }

  catch (error) {
    res.send("This is the erroe");
  }

})



app.get('/instauser', async (req, res) => {

  try {
    const data = await User.find();
    res.send(data);

  } catch (err) {
    res.status(500).send("Internal Server Error", err.message);
  }

});






const port = 3000;

Practice()
  .then(async () => {
    console.log("Mongoose Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });


  })
  .catch(err => console.error("Mongoose connection error:", err));


