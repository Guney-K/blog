var exp = require('express');
var mustache = require('mustache-express');
var bParser = require('body-parser');

var app = exp();
app.use(bParser.urlencoded({extended:true}));
app.engine("mus", mustache());
app.set("view engine", "mus");

var router = exp.Router();



router.get("/category", function(req, res){


	//Set the page title
	var pageTitleData = "404 not found!";

	res.render("../views/404/404.mus", {
		pageTitle: pageTitleData
	});

});


router.get("/category/:categoryName", function(req, res){


	//Set the page title
	var pageTitleData = "List of posts in following category:" + req.params.categoryName;

	res.render("../views/category/categoryPostList.mus", {
		pageTitle: pageTitleData
	});

});




module.exports = router;