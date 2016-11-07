var exp = require('express');
var mustache = require('mustache-express');
var bParser = require('body-parser');

var app = exp();
app.use(bParser.urlencoded({extended:true}));
app.engine("mus", mustache());
app.set("view engine", "mus");

var router = exp.Router();



router.get("/:postTitleURI", function(req, res){


	//Set the page title
	var pageTitleData = "Individual post:" + req.params.postTitleURI;

	res.render("../views/post/post.mus", {
		pageTitle: pageTitleData
	});

});

module.exports = router;