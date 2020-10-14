
export default function toParsedArray(objType, obj) {
	let parsedArray = [];
	
	switch(objType) {
		case 'artist':
			obj.artists.items.forEach(item => {
				parsedArray.push({ 
					url: item.external_urls.spotify, 
					images: item.images, 
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
					url: item.external_urls.spotify, 
					images: item.images, 
					name: item.name,
					artists: artistsArr
				});	
			});
			break;

		case 'track':
			obj.tracks.items.forEach(item => {
				let artistsArr = [];
				item.artists.forEach(artist => {
					artistsArr.push( {url: artist.external_urls.spotify, name: artist.name} );
				});

				let albumArr = { 
					url: item.album.external_urls.spotify,
					name: item.album.name
				};

				parsedArray.push({ 
					url: item.external_urls.spotify, 
					images: item.album.images, 
					name: item.name,
					artists: artistsArr,
					album: albumArr
				});
			});
			break;
	}

	return parsedArray;
}

