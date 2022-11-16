
import { MUSIC_PLATFORMS } from './../../data/MUSIC_PLATFORMS.js';

export default function toParsedArray(objType, obj) {
	let parsedArray = [];
	
	switch(objType) {
		case 'artist':
			obj.artists.items.forEach(item => {
				parsedArray.push({ 
					source: MUSIC_PLATFORMS.SPOTIFY,
					url: item.external_urls.spotify, 
					...((item.images && item.images.length) ? {images: item.images[0]} : {images: false}), 
					name: item.name
				});	
			});
			break;

		case 'album':
			obj.albums.items.forEach(item => {
				let artistsArr = [];
				item.artists.forEach(artist => {
					artistsArr.push( {url: artist.external_urls.spotify, name: artist.name} );
				});

				parsedArray.push({ 
					source: MUSIC_PLATFORMS.SPOTIFY,
					url: item.external_urls.spotify, 
					...((item.images && item.images.length) ? {images: item.images[0]} : {images: false}), 
					name: item.name,
					artists: artistsArr
				});	
			});
			break;

		case 'track':
			obj.tracks.items.forEach((item, itemIndex) => {
				let artistsArr = [];
				item.artists.forEach(artist => {
					artistsArr.push( {url: artist.external_urls.spotify, name: artist.name} );
				});

				let albumObj = { 
					url: item.album.external_urls.spotify,
					name: item.album.name
				};

				parsedArray.push({ 
					id: `spotify-t-${item.name}-${albumObj.name}`,
					source: MUSIC_PLATFORMS.SPOTIFY,
					url: item.external_urls.spotify, 
					...((item.album.images && item.album.images.length) ? {images: item.album.images[0]} : {images: false}),
					name: item.name,
					artists: artistsArr,
					album: albumObj
				});
			});
			break;
	}

	return parsedArray;
}

