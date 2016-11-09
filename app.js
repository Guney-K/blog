var exp = require('express');
var mustache = require('mustache-express');
var mongo = require('mongoose');
var methodOverride = require('method-override');
var app = exp();
var bParser = require('body-parser');
app.use(bParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

var homeRoute = require("./routes/home/home.js");
var postRoute = require("./routes/post/post.js");
var fourOfour = require("./routes/404/404.js");
var categoryRoutes = require('./routes/category/categoryPostList.js');

app.engine("mus", mustache());
app.set("view engine", "mus");



//Connect to DB

mongo.connect("mongodb://localhost/blogDB");

app.use(homeRoute);

app.use(categoryRoutes);
app.use(postRoute);
app.use(fourOfour);
app.listen(3000, function(){
	console.log("Server has initialized!");
});

