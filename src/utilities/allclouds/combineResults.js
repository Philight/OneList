
export default function combineResults(obj1, obj2) {
	let artistArr = [];
	let albumArr = [];
	let trackArr = [];

	for (let i = 0; i < 10; i++) {
		if (typeof obj1.artist[i] != 'undefined') { artistArr.push(obj1.artist[i]) };
		if (obj2.artist[i]) { artistArr.push(obj2.artist[i]) };

		if (obj1.album[i]) { albumArr.push(obj1.album[i]) };
		if (obj2.album[i]) { albumArr.push(obj2.album[i]) };

		if (obj1.track[i]) { trackArr.push(obj1.track[i]) };
		if (obj2.track[i]) { trackArr.push(obj2.track[i]) };
	}

	return { artist: artistArr, album: albumArr, track: trackArr };
}