var exp = require('express');
var mustache = require('mustache-express');
var bParser = require('body-parser');

var app = exp();
app.use(bParser.urlencoded({extended:true}));
app.engine("mus", mustache());
app.set("view engine", "mus");

var PostModel = require('../../models/PostModel.js');
var CategoryModel = require('../../models/CategoryModel.js');

var router = exp.Router();



router.get("/category", function(req, res){


	//Set the page title
	var pageTitleData = "404 not found!";

	res.render("../views/404/404.mus", {
		pageTitle: pageTitleData
	});

});

router.get("/category/management", function(req, res){

	var pageTitleData = "Management is here";
	

		CategoryModel.find({},function(err, foundCategories){
			if (err) {
				console.log(err);
			} else{
				console.log(foundCategories);
				res.render("../views/category/management", {pageTitle:pageTitleData, categories:foundCategories});
			};
		});



});

router.post("/category/management", function(req, res){

	var category = {
		name: req.body.categoryName,
		value: req.body.categoryValue,
		id: req.body.categoryId,

	};
	CategoryModel.create(category, function(err, newlyCategory){
		if (err) {
			console.log(err);
		} else{
			res.redirect("/category/management");	
		};
		
	});
});

router.get("/category/:categoryName", function(req, res){
	var pageTitleData = "List of posts in following category:" + req.params.categoryName;
	postCategory = req.params.categoryName;

	CategoryModel.find({value:postCategory}, function(err, foundCategory){
		if (err) {
			console.log(err);
		} else{
			
			PostModel.find({categories:foundCategory[0]._id}).populate("categories").exec(function(err, foundPosts){

				if (err) {
					console.log(err);
				} else{
					if (typeof foundPosts !== 'undefined' && foundPosts.length > 0) {
						console.log("postsC::" + foundPosts);
						
						res.render("../views/post/list.mus",{pageTitle:pageTitleData, posts:foundPosts});
					} else{
						res.render("../views/404/404.mus",{pageTitle:pageTitleData});
					};
				};
			});

			
		};
	});

	/*
	//PostModel.find({categories:{pos}});
	PostModel.find({'categories':postCategory}, function(err, foundPosts){

		if (err) {
			console.log(err);
		} else{
			
			console.log();
			if (typeof foundPosts !== 'undefined' && foundPosts.length > 0) {
				
				res.render("../views/post/list.mus",{pageTitle:pageTitleData, posts:foundPosts});
			} else{
				res.render("../views/404/404.mus",{pageTitle:pageTitleData});
			};
		};
	});
*/


});






module.exports = router;