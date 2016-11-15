var mongo = require("mongoose");

var CategorySchema = new mongo.Schema(
	{
		idd: Number,
		value: String,
		name: String,
		total: {type:Number, default: 0}
	}
);


module.exports =  mongo.model("CategoryModel", CategorySchema);