var exp = require('express');
var mustache = require('mustache-express');

var app = exp();
app.use(bParser.urlencoded({extended:true}));
app.engine("mus", mustache());
app.set("view engine", "mus");

var router = exp.Router();

router.get("/posts", function(req, res){

	PostModel.findOne({path:req.params.postTitleURI}, function(err, foundPost){
		if (err) {

		} else{
			res.render("../views/post/post.mus", {pageTitle:pageTitleData, post:foundPost});
		};

	});

	//Set the page title
	var pageTitleData = "Individual post:" + req.params.postTitleURI;



});