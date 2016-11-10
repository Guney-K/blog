var mongo = require("mongoose");

var CategorySchema = new mongo.Schema(
	{
		id: Number,
		value: String,
		name: String
	}
);


module.exports =  mongo.model("CategoryModel", CategorySchema);