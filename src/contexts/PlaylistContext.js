import React, { createContext, useState } from "react";

const PlaylistContext = createContext(undefined);
const PlaylistDispatchContext = createContext(undefined);

function PlaylistProvider({ children }) {
	const [playlist, setPlaylist] = useState( [
		
/*
		{	
			id: "spotify-t-01",
			source:"spotify", 
			url:"https://open.spotify.com/track/5KhFaq45chTw8RGfWo8T8J", 
			images:{ 
		        "height": 640,
        		"url": "https://i.scdn.co/image/0488b8c02bc9249ddf858e359dee66f206b1eb4f",
        		"width": 640
	        },
        	name:"trackName",
        	artists:[ {
        		url:"https://open.spotify.com/artist/7gZfnEnfiaHzxARJ2LeXrf",
        		name:"artistName"
        	} ], 
        	album: {
        		url: "https://open.spotify.com/album/1ubczeMvCrPHbSEjgfu4a7",
        		name:"albumName"	
        	}
		},

		{
			id: "youtube-t-01",
			source:"youtube", 
			url:"https://www.youtube.com/watch?v=cFOLt9kSbTw", 
			images:{ 
	           "url":"https://i.ytimg.com/vi/Pii9x-cE2IM/maxresdefault.jpg",
                 "width":480,
                 "height":360
	        },
        	name:"2trackNameaaaaaaaaaaaaaaaaaaaaa",
        	artists:[ {
        		url:"https://open.spotify.com/artist/7gZfnEnfiaHzxARJ2LeXrf",
        		name:"2artis11111aatName"
        	} ], 
        	album: {
        		url: "https://open.spotify.com/album/1ubczeMvCrPHbSEjgfu4a7",
        		name:"2albumName"	
        	}

		},
*/

	] );

	return (
		<PlaylistContext.Provider value={playlist}>
			<PlaylistDispatchContext.Provider value={setPlaylist}>
				{children}
			</PlaylistDispatchContext.Provider>
		</PlaylistContext.Provider>
	);
}

export { PlaylistProvider, PlaylistContext, PlaylistDispatchContext };