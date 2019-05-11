require("dotenv").config(); 
var fs = require("fs");
 var keys = require("./key.js");
 var Spotify = require('node-spotify-api');
 var spotify = new Spotify(keys.spotify);
 var axios = require("axios");
 var term = process.argv.slice(3).join(" ");
 var moment =require("moment");

 function bandInfo(response) {

  // moment(response.datetime).format("L");
  
  console.log("\nName of Venue: " +  response.venue.name + "\nLocation: " + response.venue.city + "," + response.venue.region +
  
   "\nDate: " + moment(response.datetime).format("L") ) 


  }

  

  function trackInfo(response) {

    // moment(response.datetime).format("L");
    
    console.log("\nName of artist: " + response.album.artists.map(function(artists){return artists.name;}) + "\nName of song: " +
    
    response.name +  "\nAlbum name: " +response.album.name + "\nPreview link: " + response.preview_url) 
  
  
    }


 if (process.argv[2] === "concert-this") {

 

    axios.get("https://rest.bandsintown.com/artists/" + term + "/events?app_id=codingbootcamp").then(
  function(response) {
    
   // console.log(response.data)
    
    response.data.map(bandInfo)
  }
);
 };

 if (process.argv[2] === "spotify-this-song") {

  spotify
.search({ type: 'track', query: term })
.then(function(response) {
  response.tracks.items.map(trackInfo)
})
.catch(function(err) {
  console.log(err);
})
};

if (process.argv[2] === "movie-this") {

    


axios.get("http://www.omdbapi.com/?t=" + term + "&y=&plot=short&apikey=trilogy").then(
function(response) {
 
  console.log("\nTitle: " + response.data.Title + "\nRelease year: " + response.data.Year + "\nIMBD Rating:" +response.data.imdbRating
  + "\nRotten Tomatoes Score: " + response.data.Ratings[2].Value + "\nWhere it was produced: " +response.data.Country +
  "\nLanguage: "  + response.data.Language + "\nPlot: " +response.data.Plot + "\nActors: " + response.data.Actors); 
}).catch(function(err) {
  console.log(err);
});

}
if (process.argv[2] === "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }

    var dataArr = data.split(",");
    console.log(dataArr);

    spotify
    .search({ type: 'track', query: dataArr[1] })
    .then(function(response) {
      response.tracks.items.map(trackInfo)
    })
    .catch(function(err) {
      console.log(err);
    })
  
  });
};




