var express = require('express');
const router = express.Router();

const bodyParser = require('body-parser');
router.use(bodyParser.json());
const fs = require('fs');

const {google} = require('googleapis');

const { YT_API_KEY } = require('./../authkeys/youtubeauth');

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
				maxResults: req.body.resultsLimit,
			});

			fs.writeFile('./youtubePrint/searchartist.txt', JSON.stringify(apiRes.data), function(err) {
				if(err) console.log(err)
			})

			console.log(apiRes.data);
			return res.send((apiRes.data));

		} catch (error) {
			return next(error);
		}
	})

function concatResults(firstObj, secondObj, thirdObj) {
	let mergedItems = [];
	for (i = 0; i < thirdObj.items.length; i++) {
		mergedItems.push(firstObj.items[i]);
		mergedItems.push(secondObj.items[i]);
		mergedItems.push(thirdObj.items[i]);
	}

	mergedItems = mergedItems.filter(function (e) {return e != null;});

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
		"thirdDetails": {
		"kind": thirdObj.kind,
		"etag": thirdObj.etag,
		"nextPageToken": thirdObj.nextPageToken,
		"regionCode": thirdObj.regionCode,
		"pageInfo": thirdObj.pageInfo,      
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

			const apiResVid1 = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'video',
				videoDuration: 'long',
				maxResults: Math.round(req.body.resultsLimit / 4),
			});

			const apiResVid2 = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'video',
				videoDuration: 'medium',
				maxResults: Math.round(req.body.resultsLimit / 4),
			});

			const apiResList = await youtube.search.list({
				part: 'id, snippet',
				key: YT_API_KEY,
				q: req.body.query,
				type: 'playlist',
				maxResults: (req.body.resultsLimit / 2),
			});

			const mergedRes = concatResults(apiResVid1.data, apiResVid2.data, apiResList.data);

			fs.writeFile('./../youtubePrint/searchalbum.txt', JSON.stringify(apiResVid1.data), function(err) {
				if(err) console.log(err)
			})
			fs.writeFile('./../youtubePrint/searchalbumPlaylist.txt', JSON.stringify(apiResList.data), function(err) {
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
				maxResults: req.body.resultsLimit,
			});

			fs.writeFile('./../youtubePrint/searchtrack.txt', JSON.stringify(apiRes.data), function(err) {
				if(err) console.log(err)
			})

			console.log(apiRes.data);
			return res.send((apiRes.data));

		} catch (error) {
			return next(error);
		}
	})


module.exports = router;