var mongo = require('mongoose');

//Post Schema

var PostSchema = new mongo.Schema({
	title: String,
	content: String,
	path: String,
	creationDate: {type: Date}
	//timestamps: { createdAt: 'created_at' }


});
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