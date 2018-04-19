
require("dotenv").config();


let operator = process.argv[2];
//let operator2 = process.argv[3];
let operator2 = "";

var ops = process.argv;

for (var i = 3; i < ops.length; i++) {

    if (i > 3 && i < ops.length) {
  
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
    default:
        console.log(process.argv[2]);
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

    var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
});
 
spotify.search({ type: 'track', query: operator2, limit : '1' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 

//   * Artist(s)
     
//   * The song's name
  
//   * A preview link of the song from Spotify
  
//   * The album that the song is from
console.log("Song: ",data.tracks.items[0].name);

console.log("Artist: ",data.tracks.items[0].artists[0].name);

console.log("Listen on Spotify: ", data.tracks.items[0].external_urls['spotify']);

console.log("Album:", data.tracks.items[0].album.name);

//console.log(JSON.stringify(data.tracks.items.album.artists.name,null, 2));
});
}

function omdb(){
    console.log("Omdb called");


// Then run a request to the OMDB API with the movie specified
var queryUrl = "http://www.omdbapi.com/?t=" + operator2 + "&y=&plot=short&apikey=de0a7d62";

// This line is just to help us debug against the actual URL.
console.log(queryUrl);

var request = require("request");

// Then run a request to the OMDB API with the movie specified
request(queryUrl, function(error, response, body) {

// If the request is successful
 if (!error && response.statusCode === 200) {

    console.log("The movie's Release Year is: " + JSON.parse(body).Year);

    console.log("Movie Plot " + JSON.parse(body).Plot);
  }
});
}

function doit() {
    console.log("Do it called");
}

