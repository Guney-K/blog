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

router.post("/posts", function(req, res){

	var postTitle = req.body.postTitle;
	var postContent = req.body.postContent;
	var postPath = constructPostPath(postTitle);
	var postDate = constructDate();
	console.log(postPath);
	
	//var postCreationDate = req.body.creationDate;

	var newPost = {title:postTitle, content:postContent, path:postPath, creationDate:postDate};
	PostModel.create(newPost, function(err, newlyPost){
		if (err) {
			console.log(err);
		}else{
			res.redirect("/posts");
		};


	});

});

router.get("/posts", function(req, res){

	PostModel.find({}, function(err, allPosts){
		if (err) {

		} else{
			res.render("../views/post/list.mus", {posts:allPosts});
		};

	});

	
});


router.get("/posts/new", function(req, res){

 res.render("../views/post/newPost.mus");

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
	PostModel.findByIdAndRemove(req.body.id, function(err){
		if (err) {
			console.log(err)
		} else{
			res.redirect("/posts");
		};
	});
});

module.exports = router;