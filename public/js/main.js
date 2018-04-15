$(() => {
	$('.category-delete').on('click', (e) => {
		$target = $(e.target);
		var vdata = $target.attr('data-cat-id');
		$.ajax({
			type: 'DELETE',
			url: '/categories/delete/'+vdata,
			success: (response) => {
				alert('Category Delete');
				window.location.href = '/';
			},
			error: (error) => {
				console.log(error);
			}

		});

	});


	$('.article-delete').on('click', (e) => {
		$target = $(e.target);
		var vdata = $target.attr('data-article-id');
		$.ajax({
			type: 'DELETE',
			url: '/articles/delete/'+vdata,
			success: (response) => {
				alert('Article Delete');
				window.location.href = '/';
			},
			error: (error) => {
				console.log(error);
			}

		});

	});

});






CKEDITOR.replace( 'body' );