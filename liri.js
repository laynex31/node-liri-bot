require("dotenv").config(); 
 var keys = require("./key.js");
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify(keys.spotify);
 var axios = require("axios");


 if (process.argv[2] === "concert-this") {

    var artist = process.argv[3];

    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
  function(response) {
    console.log(response);
  }
);
 };


 if (process.argv[2] === "spotify-this-song") {

    spotify
  .search({ type: 'track', query: process.argv[3] })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  })
 };

 if (process.argv[2] === "movie-this") {

    var movieName = "";


    for (var i = 2; i < process.argv.length; i++) {

        if (i > 2 && i < process.argv.length) {
          movieName = movieName + "+" + process.argv[i];
        }
        else {
          movieName += process.argv[i];
      
        }
      }
      


axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy").then(
  function(response) {
    console.log(response);
 });

 }
 if (process.argv[2] === "do-what-it-says") {};


