const express = require('express');
const router = express.Router();

const Article = require('../models/article.js');

router.get('/', (req, res, next) => {
	Article.getArticles((err, articles) => {
		if(err) {
			res.send(err);
		} else {
				res.render('index', {
					articles: articles,
			    title: 'All Articles'
		  });
		}
	}, 4);  
});

module.exports = router;
