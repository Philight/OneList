
export default function toSearchQuery(inputString) {
	var queryString = '';
	[...inputString].forEach((char) => {
		if (char === ' ') {
			queryString += '%20';
		}
		else {
			queryString += char;	
		}
	})
	return queryString;
}
