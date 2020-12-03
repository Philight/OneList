
import { searchSrc } from './../../components/IconDropdown';

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


function validateImage(url, callBack) {
	return new Promise((resolve, reject) => {
		var img = new Image();
		img.src = url;

		img.onload = function () {
			if (this.width == 120 && this.height == 90) {
				//alert("bad: SgXSomPE_FY");
				resolve(false);
			} else {
				//alert("maxresdefault true");
				resolve( {width: this.width, height: this.height} );
			}

			//alert( this.width+' '+ this.height );
		};

		img.onerror = function () {
			reject(new Error("img.onerror function"));
		};
	})
		
}

async function getImageUrl(typeOfId, id) {
	if (typeOfId === "video") {

		let url = `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
		var validImg = await validateImage(url);
		if (validImg) {
			return {
				url: url,
				width: validImg.width,
				height: validImg.height
			};
		} 
			
		url = `https://i.ytimg.com/vi/${id}/sddefault.jpg`;
		validImg = await validateImage(url);
		if (validImg) {
			return {
				url: url,
				width: validImg.width,
				height: validImg.height
			};
		} 

		url = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
		validImg = await validateImage(url);
		if (validImg) {
			return {
					url: url,
					width: validImg.width,
					height: validImg.height
				};
		}

		//alert("failed: "+url);
	} 
}

export default async function toParsedArray(objType, obj) {
	let parsedArray = [];
	
	switch(objType) {
		case 'artist':
			//obj.items.forEach(item => {
			for (var item of obj.items) {
				parsedArray.push({ 
					source: searchSrc.YOUTUBE,
					url: 'https://www.youtube.com/channel/'+item.snippet.channelId,
					...((item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length) ? {images: item.snippet.thumbnails.high} : {images: false}), 
					name: item.snippet.channelTitle,
				});
			};
			break;

		case 'album':
			//obj.items.forEach(item => {
			for (var item of obj.items) {
				let trackTitle = '';
				let artistTitle = '';
				let titleObject = false;

				if (titleObject = foundArtistName(item.snippet.title)) {
					trackTitle = titleObject.trackName;
					artistTitle = titleObject.artistName;
				} else {
					trackTitle = item.snippet.title;
				}

				const itemId = (item.id.videoId) 
					? item.id.videoId 
					: item.snippet.thumbnails.default.url.split('/vi/').pop().split('/default')[0];
			
				let imageObj = await getImageUrl("video", itemId);
				//alert(imageObj);

				parsedArray.push({
					source: searchSrc.YOUTUBE, 
					url: (item.id.videoId ? ('https://www.youtube.com/watch?v='+item.id.videoId) : ('https://www.youtube.com/playlist?list='+item.id.playlistId)),
					images: imageObj,
					//...((item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length) ? {images: item.snippet.thumbnails.high} : {images: false}), 
					name: trackTitle,
					artists: [{ url: "javascript:;", name: artistTitle}],
				});				
			};
	
			break;

		case 'track':
			
	//		obj.items.forEach((item, itemIndex) => {
			for (var item of obj.items) {
				let trackTitle = '';
				let artistTitle = '';
				let titleObject = false;

				if (titleObject = foundArtistName(item.snippet.title)) {
					trackTitle = titleObject.trackName;
					artistTitle = titleObject.artistName;
				} else {
					trackTitle = item.snippet.title;
				}

				let imageObj = await getImageUrl("video", item.id.videoId);
				//alert(imageObj);

				parsedArray.push({ 
					id: `youtube-t-${trackTitle}-${item.snippet.channelTitle}`,
					source: searchSrc.YOUTUBE,
					url: 'https://www.youtube.com/watch?v='+item.id.videoId, 
					images: imageObj,
					//...((item.snippet.thumbnails && Object.keys(item.snippet.thumbnails).length) ? {images: item.snippet.thumbnails.high} : {images: false}), 
					name: trackTitle,
					artists: [{ url: "javascript:;", name: artistTitle}],
					album: {url: 'https://www.youtube.com/channel/'+item.snippet.channelId, name: item.snippet.channelTitle},
				});	
			};
			break;
	}

	return parsedArray;
}