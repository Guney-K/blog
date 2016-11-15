var exp = require('express');
var mustache = require('mustache-express');
var bParser = require('body-parser');

var app = exp();
app.use(bParser.urlencoded({extended:true}));
app.use(bParser.json());

var PostModel = require('../../models/PostModel.js');
var CategoryModel = require('../../models/CategoryModel.js');



app.engine("mus", mustache());
app.set("view engine", "mus");

var router = exp.Router();




function constructDate(){
	var date = new Date();

	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var dayOfDate = days[date.getDay()];
	
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var monthOfDate = monthNames[date.getMonth()];

	var yearOfDate = date.getFullYear();

	var timeOfDate = date.getHours() + ":" + date.getMinutes();

	var postDateObj = {day:dayOfDate, month:monthOfDate, year:yearOfDate, time:timeOfDate};
	
	return postDateObj;
}

function constructPostPath(path){
	
	path = path.replace(/[^a-zA-Z0-9\s]/g,"");
	path = path.toLowerCase();
	path = path.replace(/\s/g,'-');
	path = path.replace(/-+/g, '-');


	return path;
}

function getCategoryList(){

}

router.post("/posts", function(req, res){

	var postTitle = req.body.postTitle;
	var postContent = req.body.postContent;
	var postPrize = req.body.postPrize;
	var postCategory = req.body.postCategory.toLowerCase();
	var postPath = constructPostPath(postTitle);
	var postDate = constructDate();
	var postCategories = [];
	postCategories.push(req.body.selectedCategories);

	console.log("selectedID:" + postCategories);
	
	//var postCreationDate = req.body.creationDate;

	var newPost = {
		title: postTitle, 
		content: postContent, 
		prize: postPrize, 
		category: postCategory, 
		path: postPath, 
		categories: postCategories,
		creationDate: postDate
	};

	PostModel.create(newPost, function(err, newlyPost){
		if (err) {
			console.log(err);
		}else{
			postCategories.forEach(function(category){
				
				CategoryModel.update({_id: category}, {$inc: {total: 1}},function(err){
					if (err) {
						console.log(err);
					} else{};
				});

			});
			
			//console.log(newlyPost);
			res.redirect("/posts");
		};


	});

});

router.get("/posts", function(req, res){

/*

	MyModel.find( { createdOn: { $lte: request.createdOnBefore } } ).limit( 10 ).sort( '-createdOn' )

	var lastPostIds = [];

	var pageSize = 2;
	PostModel.find().sort({"_id":-1}).limit(2);

	lastPostId = "none";



	PostModel.find({"_id" : {$lte : ObjectId(lastPostId)}}).sort({"_id":-1}).limit(pageSize).populate.exec(function(err, foundPosts){
		if (err) {

		} else{
			res.render

		};

	});
*/
	PostModel.find({}).populate("categories").exec(function(err, allPosts){
		if (err) {
			console.log(err);
		} else{

			CategoryModel.find({"total":{$gt:0}}, function(err, foundCategories){
				if (err) {
					console.log(err);
				} else{
					res.render("../views/post/list.mus", {categoryList:foundCategories, posts:allPosts});
				};
			});
			//console.log(allPosts);
			


		};

	});

	
});

router.get("/page/:pageNo", function(req, res){

	var pageSize = 2;
	var currentPageNo = req.params.pageNo;
	var paging = 5;
	var pagingCheck = 0;

	var pageNoList = [];
	var nextPageNo = currentPageNo +1 ;


	console.log(currentPageNo);

	PostModel.count(function(err, totalPosts) {
		if (err) {
			console.log(err);
		} else{
			pagingCheck = totalPosts/pageSize;

			if (totalPosts > (pageSize*paging)) {
				for (var i = -2; i < (paging-2) ; i++) {
					pageNoList.push(parseInt(currentPageNo) + i);
				};
			} else{
				for (var i = 0; i < Math.ceil(pagingCheck); i++) {
					pageNoList.push(i+1);
				};
			};


			if ((currentPageNo-1)*pageSize < totalPosts) {
				PostModel.find({}).sort({"_id":-1}).skip((currentPageNo-1)*pageSize).limit(pageSize).populate("categories").exec(function(err, foundPosts){
					if (err) {
						console.log(err);
					} else{
						res.render("../views/post/list.mus", {posts:foundPosts, pages:pageNoList});
					};

				});
			} else{

				res.render("../views/404/404.mus", {});
			};

		};
	});








	
	
});


router.get("/posts/new", function(req, res){


	CategoryModel.find({}, function(err, foundCategories){
		if (err) {
			console.log(err);
		} else{
			console.log(foundCategories);
			res.render("../views/post/newPost.mus", {categories:foundCategories});
		};
	});
	

	

});

function currentDayCheck(creationDateDay){
	var date = new Date();
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	var today = days[date.getDay()];

	if (today == creationDateDay) {
		return true;
	} else{
		return false;
	};
	

}

router.get("/:postTitleURI", function(req, res){

	PostModel.findOne({path:req.params.postTitleURI}, function(err, foundPost){
		if (err) {

		} else{

			if (foundPost != null) {
		
				var isToday = currentDayCheck(foundPost.creationDate.day);
				if (isToday){
					foundPost.creationDate.day = "Today";
				} 
				
				res.render("../views/post/post.mus", {pageTitle:pageTitleData, post:foundPost});
			}else{
				
				res.render("../views/404/404.mus", {pageTitle:pageTitleData, post:foundPost});
			}
		};
	});
	//Set the page title
	var pageTitleData = "Individual post:" + req.params.postTitleURI;
});

router.delete("/:postTitleURI", function(req, res){

	console.log(req.body.id);
	PostModel.findByIdAndRemove(req.body.id, function(err, removed){
		if (err) {
			
		} else{
			

			removed.categories.forEach(function(category){
				console.log("removed:" + category);
				CategoryModel.update({_id: category}, {$inc:{total: -1}}, function(err){
					if (err) {
						console.log(err);
					} else{};
				});

			});
			 
			res.redirect("/posts");
		};
	});
});

module.exports = router;