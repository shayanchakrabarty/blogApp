const express = require('express');
const router = express.Router();

const Category = require('../models/category.js');

router.get('/', (req, res, next) => {
	Category.getCategories((err, categories) => {
		if(err) {
			res.status(500).send(err);
		} 
		//console.log(categories);
			res.render('categories', {
	  	title:'Categories',
	  	categories: categories
	  });
	});


});

router.post('/add', (req, res, next) => {

	req.checkBody('title', 'Title is required').notEmpty();

	let errors = req.validationErrors();

	if(errors) {
		res.render('add_category', {
			errors: errors,
			'title': 'Create Category'
		});
	} else {
		const category = new Category;
		category.title = req.body.title;
		category.description = req.body.description;

		Category.addCategory(category, (err, category) => {
			if(err) {
				res.send(err);
			}
			req.flash('success', 'Category Saved');
			res.redirect('/manage/categories');
		});
	}



});

router.post('/edit/:id', (req, res, next) => {
	let category = new Category;
	const query = {_id: req.params.id}
	const update = {
		title: req.body.title,
		description: req.body.description
	}

	Category.updateCategory(query, update, {}, (err, category) => {
		if(err) {
			res.send(err);
		}
		req.flash('success', 'Category Updated');
		res.redirect('/manage/categories');
	});
});

router.delete('/delete/:id', (req, res, next) => {
	Category.deleteCategory({_id: req.params.id}, (err, category) => {
		if(err) {
			res.send(err);
		}
		req.flash('success', 'Category Deleted');
		res.status(200);
	});
});

module.exports = router;
