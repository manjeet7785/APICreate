const Express = require("express");
const app = Express();
const main = require('./Database.jsx');
const User = require('./User.jsx');

app.use(Express.json());



// TimeStamp: 2024-10-03 12:00:00
// CRUD Operations


app.post('/register', async (req, res) => {

  try {
    await User.create(req.body);
    res.send("User Registered Successfully");

  }
  catch (err) {
    res.status(500).send("Please provide all the details", err);
  }

});


app.get('/users', async (req, res) => {

  try {
    const data = await User.find();
    res.send(data);
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }

});

app.get("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const fetch = await User.findById(id);
    res.send(fetch);
  }
  catch (err) {
    res.status(500).send("Internal Server Error");
  }
})

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndDelete(id);
    res.send("User Deleted Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error");
  }
});


app.patch("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await User.findByIdAndUpdate(id, req.body, { "runValidators": true });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }
});


app.patch("/users/", async (req, res) => {
  try {
    const { _id, ...update } = req.body;
    await User.findByIdAndUpdate(_id, update, { "runValidators": true });
    res.send("User Updated Successfully");
  } catch (err) {
    res.status(500).send("Internal Server Error", err);
  }
});




const port = 3000;

main()
  .then(async () => {
    console.log("Mongoose Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });


  })



  .catch(err => console.error("Mongoose connection error:", err));


