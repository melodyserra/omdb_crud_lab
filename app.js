var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var app = express();
var favorites=[];
var counter=1;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function(req, res){

  var searchTerm = req.query.movieTitle;
  // console.log("This is the search term from the form", searchTerm)
  var url = "http://www.omdbapi.com/?s=" + searchTerm;
  // console.log("This is the url to send to OMDB's api", url)

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      console.log(obj.Search)
      res.render("results.ejs", {movieList: obj.Search});
    }
  });
});

app.get('/movie/:movie', function(req, res){

  var movieId = req.params.movie;
  // console.log("This is the search term from the form", searchTerm)
  var url = "http://www.omdbapi.com/?i=" + movieId;
  // console.log("This is the url to send to OMDB's api", url)
  var obj;

  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var obj = JSON.parse(body);
      console.log(obj);
      res.render("movie.ejs", {movie: obj});
    }
  });
});

app.get('/myMovies', function(req, res) {
  res.render("favorites.ejs", {movieList:favorites});
});

app.post('/myMovies', function(req,res) {
  console.log("This is my req.body object");
  var favorite = {};
  favorite.id = counter;
  favorite.title = req.body.movie.title;
  favorites.push(favorite);
  counter++;
  res.redirect('/myMovies');
});

app.listen(3000);
