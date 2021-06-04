const express = require('express');
const path = require("path");
const bodyParser = require('body-parser');
const session = require("express-session");
const router = require("./routes");
const app = express();
//session
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: true,
    cookie: {expires: new Date(Date.now() + 60 * 10000), maxAge: 60*10000 }
}));
//body parser
app.use(bodyParser.urlencoded({extended: true}));
//views
// app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, '/views')))
//assets
// app.use(express.static(path.join(__dirname, "/assets")));
app.use(express.static(path.join(__dirname, '/assets')))

//ejs
app.set('view engine', 'ejs');

//routes
app.use(router);

//port
const server = app.listen(3000, function() {
	console.log("listening on port 3000");
});