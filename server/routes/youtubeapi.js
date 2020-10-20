var express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fs = require('fs');

const {google} = require('googleapis');
const YT_API_KEY = 'AIzaSyC-7hRKLwK0p72SEPB3GnaRx4UQf6tKP4U';

router
/*
    POST listener - Youtube API - search for channel
*/
	.post('/searchartist', async(req, res, next) => {
		try {
			const youtube = google.youtube({
				version: 'v3',
			});

			const apiRes = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'channel',
				maxResults: 10
			});

			fs.writeFile('./youtube/searchartist.txt', JSON.stringify(apiRes.data), function(err) {
				if(err) console.log(err)
			})

			console.log(apiRes.data);
			return res.send((apiRes.data));

		} catch (error) {
			return next(error);
		}
	})

function concatResults(firstObj, secondObj) {
	let mergedItems = [];
	for (i = 0; i < firstObj.items.length; i++) {
		mergedItems.push(firstObj.items[i]);
		mergedItems.push(secondObj.items[i]);
	}

	const mergedObj = {
		"firstDetails": {
		"kind": firstObj.kind,
		"etag": firstObj.etag,
		"nextPageToken": firstObj.nextPageToken,
		"regionCode": firstObj.regionCode,
		"pageInfo": firstObj.pageInfo,      
	}, 
		"secondDetails": {
		"kind": secondObj.kind,
		"etag": secondObj.etag,
		"nextPageToken": secondObj.nextPageToken,
		"regionCode": secondObj.regionCode,
		"pageInfo": secondObj.pageInfo,      
	}, 
		"items": mergedItems,
	};

	return mergedObj;
}

router
/*
    POST listener - Youtube API - search for album
*/
	.post('/searchalbum', async(req, res, next) => {
		try {
			const youtube = google.youtube({
				version: 'v3',
			});

			const apiResVid = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'video',
				maxResults: 5,
			});

			const apiResList = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'playlist',
				maxResults: 5,
			});

			const mergedRes = concatResults(apiResVid.data, apiResList.data);

			fs.writeFile('./youtube/searchalbum.txt', JSON.stringify(apiResVid.data), function(err) {
				if(err) console.log(err)
			})
			fs.writeFile('./youtube/searchalbumPlaylist.txt', JSON.stringify(apiResList.data), function(err) {
				if(err) console.log(err)
			})

			console.log(mergedRes);
			return res.send(mergedRes);

		} catch (error) {
			return next(error);
		}
	})

/*
    POST listener - Youtube API - search for track
*/
	.post('/searchtrack', async(req, res, next) => {
		try {
			const youtube = google.youtube({
				version: 'v3',
			});

			const apiRes = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'video',
				maxResults: 10
			});

			fs.writeFile('./youtube/searchtrack.txt', JSON.stringify(apiRes.data), function(err) {
				if(err) console.log(err)
			})

			console.log(apiRes.data);
			return res.send((apiRes.data));

		} catch (error) {
			return next(error);
		}
	})


module.exports = router;