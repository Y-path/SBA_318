const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const artistRoutes = require("./routes/artistRoutes");
const error = require("./utilities/error");

app.use("./images", express.static(path.join(__dirname, "images")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api", artistRoutes);

app.use(express.static("./"));
app.use(express.static(path.join(__dirname, "/styles")));

app.get("/", (req,res) => {
    return res.send("Hi there!")
})

app.set("view engine", "ejs");

app.listen(port, () => {
    console.log(`Artist API listening on port ${port}`);
});