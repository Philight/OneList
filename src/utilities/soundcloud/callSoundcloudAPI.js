import { VARIABLES } from '../../data/ENV.js';

const API_TRACKURL = `${VARIABLES.API_HOST}:${VARIABLES.API_PORT}/one-list/soundcloudapi/searchkeyword`;

export default async function callSoundcloudAPI(searchString, resultsQuota) {
	const queryObj = { 
		query : searchString,
		resultsLimit: resultsQuota 
	};

	let responseTra = await fetch(API_TRACKURL, {
		method: 'post',
		headers: {
	    	'Accept': 'application/json',
      		'Content-Type': 'application/json'
    	},
		body: JSON.stringify(queryObj)
	});
	console.log('### SOUNDCLOUD RES');
	console.log(responseTra);
	let responseTraJSON = await responseTra.json();
	console.log(responseTraJSON);

	return responseTraJSON;
}