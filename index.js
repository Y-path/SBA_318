const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const artistRoutes = require("./routes/artistRoutes");


app.use("./images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", artistRoutes);
app.use(express.static("./"));
app.use(express.static(path.join(__dirname, "/styles")));

app.get("/", (req, res) => {
  return res.send("Hi there!")
})

app.set("view engine", "ejs");

app.get("/form", (req, res) => {
  res.sendFile(path.join("views", "form.html"));
});

app.post("/submit", (req, res) => {
  const formData = req.body;
  console.log("Form Data:", formData);

  res.send(`<h1 style="text-align:center; color:green">Success!</h1>`);
});

app.listen(port, () => {
  console.log(`Artist API listening on port ${port}`);
});