import { faSpotify, faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";

export const MUSIC_PLATFORMS = {
	SPOTIFY: 'spotify',
	SOUNDCLOUD: 'soundcloud',
	YOUTUBE: 'youtube',
	ALLCLOUDS: 'allclouds'
}

export const MUSIC_CLOUDS = {
	'spotify': { icon: faSpotify, color: '#1DB954', },
	'youtube': { icon: faYoutube, color: '#FF0000', },
	'soundcloud': { icon: faSoundcloud, color: '#FF3A00', },
	'allclouds': { icon: faCompactDisc, color: '#000', },
}