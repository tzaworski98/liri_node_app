require("dotenv").config();

var keys = require("./keys.js");

var fs = require("fs");

var axios = require("axios");

var moment = require("moment");

var Spotify = require("node-spotify-api");

// Declare all required variables above and begin coding, starting with spotify API.

var spotify = new Spotify(keys.spotify);

var userTypeQuery = process.argv[2];

 var userInput = process.argv[3];

 for( i = 4; i < process.argv.length; i++){
     userInput += " " + process.argv[i];
 }

 //switch statement calls all functions which gather the data from the JSON objects.
switch(userTypeQuery){

    case "spotify-this-song":

getSpotify();

break;

case "concert-this":

getBandsInTown();

break;

case "movie-this":

getMovie();

break;

case "do-what-it-says" :

doWhatItSays();

default:
console.log("There was an error");
};
function getSpotify(){ 

spotify
.search({type: 'track', query: userInput , limit: 1 })
.then(function(response){

    //  console.log desired responses from the object.

    console.log("Band Title: " + response.tracks.items[0].artists[0].name);
    console.log ("Song Title: " + response.tracks.items[0].name);
    console.log("Song Preview: " + response.tracks.items[0].preview_url);
    console.log("Album Title: " + response.tracks.items[0].album.name);
    
})
.catch (function(err){
    console.log(err);
});
};

function getBandsInTown(){
axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp")
.then(function (response) {
for(var i = 0; i < response.data.length; i++){

console.log("Name of Venue: " + response.data[i].venue.name);
console.log("Country: " + response.data[i].venue.country);
console.log("City: " + response.data[i].venue.city);
console.log("Date: " + moment(response.data[i].datetime).format("MM/DD/YYYY"));
console.log("________________________________________________");
};

})
.catch(function (error) {
console.log(error);
});
};

function getMovie(){
axios.get("https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy")
.then(function (response) {
    
console.log("Movie Title: " + response.data.Title);

console.log("IMDB Rating: " + response.data.imdbRating);

console.log("Rated: " + response.data.Rated);

console.log("Realease Date: " + response.data.Released);

console.log("Movie Length: " + response.data.Runtime);

console.log("Country: " + response.data.Country);

console.log("Breif Plot: " + response.data.Plot);

console.log("Main Cast: " + response.data.Actors);
})
.catch(function (error) {
console.log(error);
});
};

function doWhatItSays(){

    fs.readFile("random.txt", function(err, data){
      if (err){
          return console.log(err)
      }   
      console.log(data);
      var dataArr = data.split(",")
      console.log(dataArr)
    })
};