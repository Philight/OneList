
function foundArtistName(titleName) {
	let dashIndex = titleName.indexOf("-");

	if (dashIndex) {
		const trackName = titleName.substring(dashIndex+1);
		const artistName = titleName.substring(0, dashIndex); 

		return { artistName: artistName, trackName: trackName };

	} else {
		return false;	
	}
}

export default function toParsedArray(objType, obj) {
	let parsedArray = [];
	
	switch(objType) {
		case 'artist':
			obj.items.forEach(item => {
				parsedArray.push({ 
					url: 'https://www.youtube.com/channel/'+item.snippet.channelId,
					...((item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length) ? {images: item.snippet.thumbnails.high} : {images: false}), 
					name: item.snippet.channelTitle,
				});
			});
			break;

		case 'album':
			obj.items.forEach(item => {
				let trackTitle = '';
				let artistTitle = '';
				let titleObject = false;

				if (titleObject = foundArtistName(item.snippet.title)) {
					trackTitle = titleObject.trackName;
					artistTitle = titleObject.artistName;
				} else {
					trackTitle = item.snippet.title;
				}

				parsedArray.push({ 
					url: (item.id.videoId ? ('https://www.youtube.com/watch?v='+item.id.videoId) : ('https://www.youtube.com/playlist?list='+item.id.playlistId)),
					...((item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length) ? {images: item.snippet.thumbnails.high} : {images: false}), 
					name: trackTitle,
					artists: [{ url: "javascript:;", name: artistTitle}],
				});				
			});
	
			break;

		case 'track':
			obj.items.forEach(item => {
				let trackTitle = '';
				let artistTitle = '';
				let titleObject = false;

				if (titleObject = foundArtistName(item.snippet.title)) {
					trackTitle = titleObject.trackName;
					artistTitle = titleObject.artistName;
				} else {
					trackTitle = item.snippet.title;
				}

				parsedArray.push({ 
					url: 'https://www.youtube.com/watch?v='+item.id.videoId, 
					...((item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length) ? {images: item.snippet.thumbnails.high} : {images: false}), 
					name: trackTitle,
					artists: [{ url: "javascript:;", name: artistTitle}],
					album: {url: 'https://www.youtube.com/channel/'+item.snippet.channelId, name: item.snippet.channelTitle},
				});	
			});
			break;
	}

	return parsedArray;
}