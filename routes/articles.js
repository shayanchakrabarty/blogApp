const express = require('express');
const router = express.Router();


const Article = require('../models/article.js');
const Category = require('../models/category.js');

router.get('/', (req, res, next) => {
	Article.getArticles((err, articles) => {
		if(err) {
			res.send(err).status(500);
		} else {
			res.render('articles', {
				title: 'Articles',
				articles: articles
			});
		}
	});
});

router.get('/show/:id', (req, res, next) => {
	Article.getArticleById(req.params.id, (err, article) => {
		if(err) {
			res.send(err);
		} else {
			res.render('article', {
				title: 'Article',
				article: article
			});
		}
	});
});

router.get('/category/:category_id', (req, res, next) => {
	Article.getCategoryArticles(req.params.category_id, (err, articles) => {
		if(err) {
			res.send(err).status(500);
		} else {
			Category.getCategoryById(req.params.category_id, (err, category) => {
				if(err) {
					res.send(err).status(500);
				}
					res.render('articles', {
					title: category.title+' Articles',
					articles: articles
				});
			});
		}
	});
  
});


router.post('/add', (req, res, next) => {
	//const article = new Article;

	req.checkBody('title', 'Title is required').notEmpty();

	let errors = req.validationErrors();

	if(errors) {
		Category.getCategories((err, categories) => {
			if(err) {
				res.send(err);
			} else {
					res.render('add_article', {
					errors: errors,
					categories: categories,
					title: 'Create Article'
				});
			}
		});
	} else {
			Article.addArticle(req.body, (err, article) => {
			if(err) {
				res.send(err);
			}
			res.redirect('/manage/articles');
		});
	}
});

router.post('/edit/:id', (req, res, next) => {
	const query = {_id: req.params.id}; 
	const update = req.body;
	console.log(update);

	Article.updateArticle(query, update, {}, (err, article) => {
		if(err) {
			res.send(err);
		}
		res.redirect('/manage/articles');
	});
});

router.delete('/delete/:id', (req, res, next) => {
	Article.deleteArticle({_id: req.params.id}, (err, article) => {
		if(err) {
			res.send(err);
		}
		res.status(200);
	});
});


router.post('/comments/add/:id', (req, res, next) => {

	req.checkBody('comment_subject', 'Subject is Required').notEmpty();
	req.checkBody('comment_author', 'Author is Required').notEmpty();
	req.checkBody('comment_email', 'Email is Required').notEmpty().isEmail().withMessage('must be an email');

	let errors = req.validationErrors();

	if(errors) {
		Article.findOne({_id: req.params.id}, (err, article) => {
				res.render('article', {
				title: 'Article',
				article: article,
				errors: errors
			});
		});

	} else {
			let  article = new Article();

			let comment = {
				comment_subject: req.body.comment_subject,
				comment_author: req.body.comment_author,
				comment_email: req.body.comment_email,
				comment_body: req.body.comment_body
			}

			Article.addComment({ _id: req.params.id }, comment , (err, article) => {
			if(err) {
				res.send(err);
			} else {
				res.redirect('/articles/show/'+req.params.id);
			}
		});
	}

	
});


module.exports = router;
