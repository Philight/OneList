var express = require('express');
const router = express.Router();
var request = require('request');

const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fs = require('fs');

const CLIENT_ID = "8a92dfb00bbf41d4a20581983e7627a6";
const CLIENT_SECRET = "d5c71c52b3d94123a611c14528b7bc7d";

var spotifyAccessToken = "";

/* 
    Request - Spotify API - Authorization 
*/

	function newToken() {
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
	};


router
	// Add a binding to handle '/tests'
	.get('/', function(){
	// render the /tests view
	})
	.get('/token', function (req, res) {
		return res.send(spotifyAccessToken);
	})

	// Import my automated routes into the path '/tests/automated'
	// This works because we're already within the '/tests' route so we're simply appending more routes to the '/tests' endpoint
	// .use('/automated', automatedRoutes);

/* 
    POST listener - Spotify API - search for artist 
*/
	.post('/searchartist', function (req, res) {
		console.log("artist q:"+req.body.query);
		var options = {
			url: 'https://api.spotify.com/v1/search?q=artist:'+req.body.query+'&limit=10&type=artist',
			headers: {
			  'Authorization': 'Bearer ' + spotifyAccessToken
			},
			json: true
		};

		request.get(options, function(error, response, body) {
			console.log("artist err: "+error);
			console.log("artist res: "+response);
			console.log("artist body: "+body);

			fs.writeFile('./spotify/searchartist.txt', JSON.stringify(body), function(err) {
			  if(err) console.log(err)
			})

			return res.send(body);
		});
	})

/* 
    POST listener - Spotify API - search for album 
*/
	.post('/searchalbum', function (req, res) {
		console.log("album q:"+req.body.query);
		var options = {
			url: 'https://api.spotify.com/v1/search?q=album:'+req.body.query+'&limit=10&type=album',
			headers: {
			  'Authorization': 'Bearer ' + spotifyAccessToken
			},
			json: true
		};

		request.get(options, function(error, response, body) {
			console.log("album err: "+error);
			console.log("album res: "+response);
			console.log("album body: "+body);

			fs.writeFile('./spotify/searchalbum.txt', JSON.stringify(body), function(err) {
			  if(err) console.log(err)
			})

			return res.send(body);
		});
	})

/* 
    POST listener - Spotify API - search for track 
*/
	.post('/searchtrack', function (req, res) {
		console.log("track q:"+req.body.query);
		var options = {
			url: 'https://api.spotify.com/v1/search?q=track:'+req.body.query+'&limit=10&type=track',
			headers: {
			  'Authorization': 'Bearer ' + spotifyAccessToken
			},
			json: true
		};

		request.get(options, function(error, response, body) {
			console.log("track err: "+error);
			console.log("track res: "+response);
			console.log("track body: "+body);

			fs.writeFile('./spotify/searchtrack.txt', JSON.stringify(body), function(err) {
			  if(err) console.log(err)
			})

			return res.send(body);
		});
	})

//exports.router = router;
//module.exports = router;

module.exports = {
	router: router,
	newToken: newToken,
};
