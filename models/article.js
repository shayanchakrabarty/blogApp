const mongoose = require('mongoose');

const articleSchema = mongoose.Schema({
	title: { type: String },
	subtitle: { type: String },
	category: { type: String },
	body: { type: String },
	author: { type: String },
	created_at: { type: Date , default: Date.now },
	comments: [{
		comment_subject: { type: String },
		comment_body: { type: String },
		comment_author: { type: String },
		comment_email: { type: String },
		comment_date: { type: String }
	}]
});


const Article = module.exports = mongoose.model('Article', articleSchema);


// Get Articles
module.exports.getArticles = (callback, limit) => {
	Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}

//add article
module.exports.addArticle = (article, callback) => {
	Article.create(article, callback);
}


// fetch Article data by ID
module.exports.getArticleById = (id, callback) => {
	Article.findById(id, callback);
}

// get Articles by category
module.exports.getCategoryArticles = (categoryId, callback) => {
	Article.find({category: categoryId}, callback).sort([['title', 'ascending']]);
}


//update Article
module.exports.updateArticle = (query, update, options, callback) => {
	Article.findOneAndUpdate(query, update, options, callback);
}

// add comment 
module.exports.addComment = (query, comment, callback) => {
	Article.update(query, { $push: { comments: comment } }, callback);
}

//delete Article
module.exports.deleteArticle = (id, callback) => {

	Article.findByIdAndRemove(id, callback);
} 