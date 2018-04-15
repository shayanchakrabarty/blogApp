const mongoose = require('mongoose');

// Category Schema
const categorySchema = mongoose.Schema({
	title: {
		type: String
	}, 
	description: {
		type: String
	}
});

const	Category = module.exports = mongoose.model('Category', categorySchema);


// Get Categories
module.exports.getCategories = (callback, limit) => {
	Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

//add category
module.exports.addCategory = (category, callback) => {
	Category.create(category, callback);
}


// fetch category data by ID
module.exports.getCategoryById = (id, callback) => {
	Category.findById(id, callback);
}

//update categorty
module.exports.updateCategory = (query, update, options, callback) => {
	Category.findOneAndUpdate(query, update, options, callback);
}

//delete category
module.exports.deleteCategory = (id, callback) => {

	Category.findByIdAndRemove(id, callback);
} 