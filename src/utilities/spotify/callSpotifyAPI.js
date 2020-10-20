
import toSearchQuery from './toSearchQuery';
import toParsedArray from './toParsedArray';

export default async function callSpotifyAPI(inputText) {
	var searchQuery = toSearchQuery(inputText);
	var queryObj = { query : searchQuery };

	var artistArr = [];
	var albumArr = [];
	var trackArr = [];

	// Search for artist
	let responseArt = await fetch("/spotifyapi/searchartist", {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseArtJson = await responseArt.json();

	artistArr = toParsedArray('artist', responseArtJson);
/*
	artistArr.forEach(item => {
		alert("URL: " + item.url + '\n' +
			"name: " + item.name
		);
	})
	*/
	// Search for album
	let responseAlb = await fetch("/spotifyapi/searchalbum", {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseAlbJson = await responseAlb.json();
	
	albumArr = toParsedArray('album', responseAlbJson);

	// Search for track
	let responseTra = await fetch("/spotifyapi/searchtrack", {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseTraJson = await responseTra.json();

	trackArr = toParsedArray('track', responseTraJson);

	return { artist: artistArr, album: albumArr, track: trackArr };
}