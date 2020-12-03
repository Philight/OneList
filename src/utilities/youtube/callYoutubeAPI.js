
import toParsedArray from './toParsedArray';

export default async function callYoutubeAPI(inputText, resultsQuota) {
	var queryObj = { 
		query : inputText,
		resultsLimit: resultsQuota 
	};

	var artistArr = [];
	var albumArr = [];
	var trackArr = [];

	// Search for artist
	let responseArt = await fetch("/youtubeapi/searchartist", {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseArtJson = await responseArt.json();

	artistArr = await toParsedArray('artist', responseArtJson);

	// Search for album
	let responseAlb = await fetch("/youtubeapi/searchalbum", {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseAlbJson = await responseAlb.json();

	albumArr = await toParsedArray('album', responseAlbJson);

	// Search for track
	let responseTra = await fetch("/youtubeapi/searchtrack", {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseTraJson = await responseTra.json();

	trackArr = await toParsedArray('track', responseTraJson);

	return { artist: artistArr, album: albumArr, track: trackArr };
}