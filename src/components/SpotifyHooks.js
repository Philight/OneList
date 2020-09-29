import React from 'react';

import { useArtist } from 'react-spotify-api';

function SpotifyHooks(props) {
    const { data, loading, error } = useArtist("1XpDYCrUJnvCo9Ez6yeMWh")

    if (data) {
        return <h1>{data.artist.name}</h1>
    } 
    return null;
}

export default SpotifyHooks;