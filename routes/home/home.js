var exp = require('express');
var mustache = require('mustache-express');

var app = exp();
app.engine("mus", mustache());
app.set("view engine", "mus");

var router = exp.Router();

router.get("/", function(req, res){
	//Set the page title
	var pageTitleData = "Welcome to GBlog";

	res.render("../views/home.mus", {
		pageTitle: pageTitleData
	});

});

module.exports = router;