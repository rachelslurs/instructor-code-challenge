describe('Make movie list', function() {
	var result = {
		"Title": "Mars Attacks!",
		"Type": "movie",
		"Year": "1996",
		"imdbID": "tt0116996"
	};
	var docFrag=document.createDocumentFragment();
	var movieList=document.createElement('div');
	movieList.id="movie-list";
	docFrag.appendChild(movieList);
	var link = '<a class="title" title="More info on Mars Attacks!">Mars Attacks!</a>';
		
	beforeEach(function() {
		spyOn(window.MovieApp, 'createDetailsLink').and.callThrough();
		spyOn(window.MovieApp, 'appendMovie');
		
		document.body.appendChild(docFrag);
		movieList=document.querySelector('#movie-list');
		window.MovieApp.appendMovie(movieList,result);
		window.MovieApp.createDetailsLink(result);

		
	});
	it('should append a movie to the list', function() {
		expect(window.MovieApp.appendMovie).toHaveBeenCalled();
	});
	it('should return the right details link', function() {
		expect(window.MovieApp.createDetailsLink(result).outerHTML).toEqual(link);
	});
	it('should return the right details link', function() {
		console.log(linkString);
		expect(linkString).toEqual(link);
	});
});