// This syntax is an anonymous self invoked function, meaning it runs automatically
(function() { 
  window.MovieApp = {
    favorite: 'Favorite it?',

    favorited: 'Favorited!',

    init: function() {
      document.querySelector('form').addEventListener('submit', function(event){
      // Event handler added to 'Search' button (identified by type='submit') to handle ajax request to the API

      var movieList = document.querySelector('#movie-list');
      // Clears any previous search results
      while (movieList.hasChildNodes()) {
        movieList.removeChild(movieList.lastChild);
      }
      event.preventDefault();
      var input = document.querySelector('input').value;
      var xhr = new XMLHttpRequest();
      xhr.open('get', 'https://www.omdbapi.com/?s=' + encodeURIComponent(input) + '&r=json', true);
      xhr.addEventListener('load', function(){
        var results = JSON.parse(this.response).Search;
        for(var i = 0; i < results.length; i++){
          MovieApp.appendMovie(movieList, results[i]);
        }
      });
      xhr.send();
      });
    },

    appendMovie: function(movieList, result) {
      // Sets up the proper formatting for an individual movie result and appends it to the existing movie list

      var listItem = document.createDocumentFragment();
      var row = document.createElement('div');
      var divTitle = document.createElement('div');
      var divFavorite = document.createElement('div');
      row.className='row';
      divTitle.className = 'large-8 columns';
      divFavorite.className = 'large-4 columns';
      row.appendChild(divFavorite);
      row.appendChild(divTitle);
      listItem.appendChild(row);
      divTitle.appendChild(MovieApp.createDetailsLink(result));
      divFavorite.appendChild(MovieApp.createFavoriteButton(result));

      movieList.appendChild(listItem);
    },

    createDetailsLink: function(result) {
      // Creates the link that displays more info for the selected movie

      var detailsLink = document.createElement('a');
      detailsLink.className = 'title';
      detailsLink.title='More info on ' + result.Title;
      detailsLink.innerText = result.Title;
      detailsLink.addEventListener('click', function() {
        // Adding the appropriate event listener to the anchor tag
        MovieApp.getDetails(result);
      });
      return detailsLink;
    },

    createFavoriteButton: function(result) {
      // Creates a favorite button 

      var favoriteButton = document.createElement('button');
      favoriteButton.classList.add('expand');
      favoriteButton.innerText = MovieApp.favorite;

      var favoriteListener = function() {
        MovieApp.addFavorite(result);
        this.innerText = MovieApp.favorited;
        // Remove the event listener once it's already been favorited
        this.removeEventListener('click', favoriteListener, false);
      };
      
      // Adds the favorite listener on click
      favoriteButton.addEventListener('click', favoriteListener); 

      return favoriteButton;
    },

     addFavorite: function(result) {
      // Calls backend to post the favorite

      var xhr = new XMLHttpRequest();
      xhr.open('post', '/favorites', true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var data = 'name=' + encodeURI(result.Title) + '&oid=' + result.imdbID;
      xhr.send(data);
    },
    
    getDetails: function(result) {
      // Fetches movie details from omdb for the selected movie

      var xhr = new XMLHttpRequest();
      xhr.open('get', 'https://www.omdbapi.com/?i=' + encodeURIComponent(result.imdbID) + '&plot=full&r=json', true);
      xhr.addEventListener('load', function(){
        MovieApp.showDetails(JSON.parse(this.response));
      });
      xhr.send();
    },

    showDetails: function(result) {
      // Lists movie details for the given result

      var detailsElement = document.querySelector('#movie-details');

      // Clears any previous details
      while (detailsElement.hasChildNodes()) {
        detailsElement.removeChild(detailsElement.lastChild);
      }

      var info = document.createDocumentFragment();

      // There is a 'Poster' attribute that we can use to make an image
      if (result['Poster']) {
        var img = document.createElement('img');
        img.src=result['Poster'];
        detailsElement.appendChild(img);
        // Removing 'Poster' from JSON response so it doesn't end up in the following for loop
        delete result['Poster'];
      }

      // Loops through details and creates DOM elements to display info
      for (var key in result) {
        var dl = document.createElement('dl');
        var dt = document.createElement('dt');
        var dd = document.createElement('dd');
        dt.innerText = key;
        dd.innerText = result[key];
        dl.appendChild(dt);
        dl.appendChild(dd);
        info.appendChild(dl);
        detailsElement.appendChild(info);
      }
      // Adding additional favorite button under details
      detailsElement.appendChild(MovieApp.createFavoriteButton(result));
    }
  }
  MovieApp.init();
})();