
import toParsedArray from './toParsedArray';
import { VARIABLES } from '../../data/ENV.js';

export default async function callYoutubeAPI(inputText, resultsQuota) {
	var queryObj = { 
		query : inputText,
		resultsLimit: resultsQuota 
	};

	var artistArr = [];
	var albumArr = [];
	var trackArr = [];

	// Search for artist
	let responseArt = await fetch(`${VARIABLES.API_HOST}:${VARIABLES.API_PORT}/one-list/youtubeapi/searchartist`, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseArtJson = await responseArt.json();

	artistArr = await toParsedArray('artist', responseArtJson);
console.log('### callYoutubeAPI artistArr');
console.log(artistArr);
	// Search for album
	let responseAlb = await fetch(`${VARIABLES.API_HOST}:${VARIABLES.API_PORT}/one-list/youtubeapi/searchalbum`, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseAlbJson = await responseAlb.json();

	albumArr = await toParsedArray('album', responseAlbJson);
console.log('### callYoutubeAPI albumArr');
console.log(albumArr);

	// Search for track
	let responseTra = await fetch(`${VARIABLES.API_HOST}:${VARIABLES.API_PORT}/one-list/youtubeapi/searchtrack`, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	let responseTraJson = await responseTra.json();

	trackArr = await toParsedArray('track', responseTraJson);
console.log('### callYoutubeAPI trackArr');
console.log(trackArr);

	return { artist: artistArr, album: albumArr, track: trackArr };
}