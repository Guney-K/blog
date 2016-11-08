var exp = require('express');
var mustache = require('mustache-express');
var bParser = require('body-parser');

var app = exp();
app.use(bParser.urlencoded({extended:true}));
app.use(bParser.json());
var PostModel = require('../../models/PostModel.js');


app.engine("mus", mustache());
app.set("view engine", "mus");

var router = exp.Router();



router.get("/:postTitleURI", function(req, res){

	PostModel.findOne({path:req.params.postTitleURI}, function(err, foundPost){
		if (err) {

		} else{

			if (foundPost != null) {
				res.render("../views/post/post.mus", {pageTitle:pageTitleData, post:foundPost});
			}else{
				res.render("../views/404/404.mus", {pageTitle:pageTitleData, post:foundPost});
			}
		
			
		};

	});

	//Set the page title
	var pageTitleData = "Individual post:" + req.params.postTitleURI;



});

router.post("/posts", function(req, res){

	console.log(req.body);
	var postTitle = req.body.postTitle;
	var postContent = req.body.postContent;
	var postPath = req.body.postPath;
	//var postCreationDate = req.body.creationDate;

	var newPost = {title:postTitle, content:postContent, path:postPath};
	PostModel.create(newPost, function(err, newlyPost){
		if (err) {
			console.log(err);
		}else{
			res.redirect("/");
		};


	});

});


router.get("/posts/new", function(req, res){

 res.render("../views/post/newPost.mus");

});



module.exports = router;