var exp = require('express');
var mustache = require('mustache-express');

var app = exp();
var homeRoute = require("./routes/home/home.js");
var postRoute = require("./routes/post/post.js");
var fourOfour = require("./routes/404/404.js");
var categoryRoutes = require('./routes/category/categoryPostList.js');

app.engine("mus", mustache());
app.set("view engine", "mus");



app.use(homeRoute);
app.use(postRoute);
app.use(categoryRoutes);
app.use(fourOfour);
app.listen(3000, function(){
	console.log("Server has initialized!");
});

