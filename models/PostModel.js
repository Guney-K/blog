var mongo = require('mongoose');

//Post Schema

var PostSchema = new mongo.Schema(
	{
		title: String,
		content: String,
		prize: String,
		category:String,
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

module.exports = mongo.model("PostModel", PostSchema);