const Express = require("express");
const app = Express();
const main = require('./mongoose.jsx');
const User = require('./API.jsx');


app.use(Express.json());

const port = 3000;

app.get("/", async (req, res) => {
  const ans = await User.find({})
  res.send(ans);
});

app.post("/add", async (req, res) => {

  const insert = new User(req.body);
  await insert.save();
  console.log("User added:", insert);

  res.send("User added");

});

main()
  .then(async () => {
    console.log("Mongoose Connected")
    app.listen(port, () => {
      console.log(`Server is running on http://localhost: ${port}`);
    });

    const name = await User.find({ Location: "Toronto" });
    console.log("Users located in Toronto:", name);
  })

  .catch(err => console.error("Mongoose connection error:", err));


