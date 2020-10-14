
const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

const fs = require('fs');

app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());

/* GET listener tests */
app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

var request = require('request'); // "Request" library

const CLIENT_ID = "8a92dfb00bbf41d4a20581983e7627a6";
const CLIENT_SECRET = "d5c71c52b3d94123a611c14528b7bc7d";

var spotifyAccessToken = "";

/* 
    Request - Spotify API - Authorization 
*/
var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
	console.log("request");
	if (!error && response.statusCode === 200) {

		spotifyAccessToken = body.access_token;
		console.log("TOKEN: "+spotifyAccessToken);
	}
});

/* 
    GET listener - Spotify API - send token 
*/
app.get('/spotifyapi/token', function (req, res) {
  return res.send(spotifyAccessToken);
})

/* 
    POST listener - Spotify API - search for artist 
*/
app.post('/spotifyapi/searchartist', function (req, res) {
	// params
  console.log(req.body.query);
  var options = {
		url: 'https://api.spotify.com/v1/search?q=artist:'+req.body.query+'&limit=10&type=artist',
		headers: {
		  'Authorization': 'Bearer ' + spotifyAccessToken
		},
		json: true
  };

  request.get(options, function(error, response, body) {
  	console.log(body);

    fs.writeFile('./searchartist.txt', JSON.stringify(body), function(err) {
      if(err) console.log(err)
    })

    return res.send(body);
  });
})

/* 
    POST listener - Spotify API - search for album 
*/
app.post('/spotifyapi/searchalbum', function (req, res) {
  console.log(req.body.query);
  var options = {
    url: 'https://api.spotify.com/v1/search?q=album:'+req.body.query+'&limit=10&type=album',
    headers: {
      'Authorization': 'Bearer ' + spotifyAccessToken
    },
    json: true
  };

  request.get(options, function(error, response, body) {
    console.log(body);

    fs.writeFile('./searchalbum.txt', JSON.stringify(body), function(err) {
      if(err) console.log(err)
    })

    return res.send(body);
  });
})

/* 
    POST listener - Spotify API - search for track 
*/
app.post('/spotifyapi/searchtrack', function (req, res) {
  console.log(req.body.query);
  var options = {
    url: 'https://api.spotify.com/v1/search?q=track:'+req.body.query+'&limit=10&type=track',
    headers: {
      'Authorization': 'Bearer ' + spotifyAccessToken
    },
    json: true
  };

  request.get(options, function(error, response, body) {
    console.log(body);

    fs.writeFile('./searchtrack.txt', JSON.stringify(body), function(err) {
      if(err) console.log(err)
    })

    return res.send(body);
  });
})

app.listen(process.env.PORT || 8080);