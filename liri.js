
require("dotenv").config();

let args = process.argv;
let operator = process.argv[2];
let operator2 = "";


processRequest(args,3);

function processRequest(ops, index){

for (var i = index; i < ops.length; i++) {

    if (i > index && i < ops.length) {
  
      operator2 = operator2 + "+" + ops[i];
  
    }
  
    else {
  
        operator2 += ops[i];
  
    }
  }
switch(operator){
    case "my-tweets":
        //console.log(operator);
        myTweets();
        //console.log(result);
        break;
    case "spotify-this-song":
        //console.log(operator);
        spotify();
        //console.log(result);
        break;
    case "movie-this":
        omdb();
        //console.log(result);
        break;
    case "do-what-it-says":
        doit();
    default:
        console.log(process.argv[2]);
}
}


function myTweets(){
    console.log("My Tweets called");
    var Twitter = require('twitter');
 
var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
 
var params = {limit: '20'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {

var limit;

if (tweets.length >= 20){

     limit = 20;
}    
else{
  limit = tweets.length;
}

    for(let i=0; i<limit; i++){

        console.log(JSON.stringify(tweets[i].text + " -----> " + tweets[i].created_at, null, 2));
        console.log(''); 

    }
   
  }
});

}

function spotify(){
    //console.log("Spotify called");
    //console.log(operator2)

    var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: operator2, limit : '1' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 

//console.log(JSON.stringify(data, null, 2));

console.log('\n'+"Song: ",data.tracks.items[0].name);

console.log("Artist: ",data.tracks.items[0].artists[0].name);

console.log("Listen on Spotify: ", data.tracks.items[0].external_urls['spotify']);

console.log("Album:", data.tracks.items[0].album.name+'\n');

//console.log(JSON.stringify(data.tracks.items.album.artists.name,null, 2));
});
}

function omdb(){

// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + operator2 + "&y=&plot=short&apikey=de0a7d62";

//console.log(queryUrl);

var request = require("request");

// Then run a request to the OMDB API with the movie specified
request(queryUrl, function(error, response, body) {

// If the request is successful
 if (!error && response.statusCode === 200) {

    //console.log(JSON.parse(body));


    console.log("Movie Title: " + JSON.parse(body).Title+ '\n');

    console.log("Release Year: " + JSON.parse(body).Year+ '\n');

    console.log("The movie's Ratings (IMDB): " + JSON.parse(body).imdbRating+ '\n');

    console.log("Movie Plot: " + JSON.parse(body).Plot+ '\n');

    console.log("Actors: " + JSON.parse(body).Actors+ '\n');

    console.log("Country: " + JSON.parse(body).Country+ '\n');

    console.log("Movie's Languages: " + JSON.parse(body).Language+ '\n');
  }
});
}

// * Title of the movie.
// * Year the movie came out.
// * IMDB Rating of the movie.
// * Rotten Tomatoes Rating of the movie.
// * Country where the movie was produced.
// * Language of the movie.
// * Plot of the movie.
// * Actors in the movie.

function doit() {
    console.log("Do it called");

    var fs = require('fs');

    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        console.log(data);
      
        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");
      
        // We will then re-display the content as an array for later use.
        console.log(dataArr);

        operator = dataArr[0];
        operator2 = "";

        processRequest(dataArr,1);
      
      });
}
