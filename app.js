const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(express.static("./"));

app.get("/", (req,res) => {
    return res.send("welcome")
})

app.set('view engine', 'ejs');

app.use('./images', express.static(path.join(__dirname, 'images')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const artistRoutes = require('./routes/artistRoutes');
app.use('/api', artistRoutes);



app.listen(port, () => {
    console.log(`Art API listening on port ${port}`);
});