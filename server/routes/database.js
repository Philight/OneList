var express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());

const fs = require('fs');
var crypto = require("crypto");

function shouldBeCleaned() {
	var timeStamp = fs.readFileSync('./database/lastclean');

	// Clean every (1 day | 86400 seconds)*1000 
	if ((Date.now() - timeStamp) >= 86400000) {
		return true;
	} else {
		return false;
	}
}

function clean() {
	console.log("Cleaning up...");
	var rawdata = fs.readFileSync('./database/playlists.json');
	var playlists = JSON.parse(rawdata);

	var timeNow = Date.now();
	for (id in playlists) {
		// 60*1000 = 1 minute has passed
		if ((timeNow - playlists[id].timeStamp) > 60000) {
			delete playlists[id];
		}
	}

	fs.writeFile('./database/lastclean', timeNow, function(err) {
		if(err) console.log(err)
	})

	fs.writeFile('./database/playlists.json', JSON.stringify(playlists), function(err) {
		if(err) console.log(err)
	})
}

/*
	 ---> ROUTES -=<{
*/
router
	.get('/', async function(req, res, next) {
		//console.log(req.query);
		//console.log(req.query.playlistId);

		var rawdata = fs.readFileSync('./database/playlists.json');
		var playlists = JSON.parse(rawdata);

		if (req.query.playlistId in playlists) {
			var foundPlaylist = JSON.stringify(playlists[req.query.playlistId]);
			//console.log("Sending playlist");
			//console.log(foundPlaylist);
			res.send(foundPlaylist);
		} else {
			res.status(404).send("Playlist not found");
		}
	})

	.post('/createplaylist', (req, res, next) => {
		//console.log(req.body.playlistObject);
		let rawdata = fs.readFileSync('./database/playlists.json');
		let playlists = JSON.parse(rawdata);
		//console.log(playlists);

		// Add timestamp
		req.body.playlistObject.timeStamp = Date.now();

		var playlistId = crypto.randomBytes(10).toString('hex');
		while(playlistId in playlists) {
			playlistId = crypto.randomBytes(10).toString('hex');
		}

		playlists[playlistId] = req.body.playlistObject;
		//console.log(playlists);

		fs.writeFile('./database/playlists.json', JSON.stringify(playlists), function(err) {
			if(err) console.log(err)
		})

		res.send("http://localhost:3000/playlist/" +playlistId);
	})


module.exports = {
	router: router,
	clean: clean,
	shouldBeCleaned: shouldBeCleaned
}