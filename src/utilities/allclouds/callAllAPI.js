import callSpotifyAPI from './../spotify/callSpotifyAPI';
import callYoutubeAPI from './../youtube/callYoutubeAPI';

import combineResults from './combineResults';

export default async function callAllAPI(inputText) {
	let spotifyResults = callSpotifyAPI(inputText);
	let youtubeResults = callYoutubeAPI(inputText);

	return (combineResults(await spotifyResults, await youtubeResults));
}