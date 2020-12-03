import callSpotifyAPI from './../spotify/callSpotifyAPI';
import callYoutubeAPI from './../youtube/callYoutubeAPI';

import combineResults from './combineResults';

export default async function callAllAPI(inputText, resultsQuota) {
	let spotifyResults = callSpotifyAPI(inputText, resultsQuota);
	let youtubeResults = callYoutubeAPI(inputText, resultsQuota);

	return (combineResults(resultsQuota, await spotifyResults, await youtubeResults));
}