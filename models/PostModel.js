var mongo = require('mongoose');

//Post Schema

var PostSchema = new mongo.Schema(
	{
		title: String,
		content: String,
		path: String,
		creationDate:{
			day: String,
			month: String,
			year: String,
			time: String
		}
		
		//timestamps: { createdAt: 'created_at' }
	},
	{
		timestamps: true
	}
);
/*
var PostSchema = new mongo.Schema({
	title: String,
	content: String,
	date: {Date: Date.now},
	timestamps: { createdAt: 'created_at' },

	author: {
		name: String
	},

	comments:[
		{
			type: mongo.Schema.Types.ObjectId,
			ref: "CommentModel"
		}
	]

});
*/
module.exports = mongo.model("PostModel", PostSchema);