const express = require('express');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.get('/', (req, res) => {
    res.render('index');
});
app.get("/methods", (req, res) => {
    res.render("methods");
});
app.get("/bmi", (req, res) => {
    res.render("bmi");
});

app.listen(port, (err) => {
    console.log(`Server is running on port ${port}`);
});