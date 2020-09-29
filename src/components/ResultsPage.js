import React, { Component } from "react";
import styled from 'styled-components';
import { SpotifyApiContext, Search, Artist } from 'react-spotify-api';

import ResultsRecord from './ResultsRecord';

import SpotifyHooks from './SpotifyHooks';

const ResultsContainer = styled.div`
	width: 82% !important;
 	margin-left: 9% !important;
 	margin-right: 9% !important;
 	margin-top: 80px; /* line height of NavBar */
 	padding-top: 1px;

 	height: calc(100vh - 80px);

 	display: grid;
 	grid-template-columns: 1fr 1fr 1fr;
`

const ArtistColumn = styled.div`
	display: flex;
 	flex-direction: column;
 	align-items: center;

 	background-color: var(--primarycolor);
 	height: calc(100vh - 80px);
`

const TrackColumn = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

 	background-color: var(--secondarycolor);
 	height: calc(100vh - 80px);
`

const AlbumColumn = styled.div`
/*
	display: grid;
 	grid-template-rows: 0.3fr 1fr 1fr 1fr 1fr 1fr;
*/
	display: flex;
	flex-direction: column;
	align-items: center;

 	background-color: var(--primarycolor);
 	height: calc(100vh - 80px);
`

const ColumnTitle = styled.label`
	margin: 1%;
	font-size: 32px;

	color: white;
`

const ResultsPage = (props) => {
	return (
		<SpotifyApiContext.Provider value={props.token}>
			<ResultsContainer>
				<ArtistColumn>
					<ColumnTitle>Artists</ColumnTitle>
					{ [...Array(4)].map((e, i) => <ResultsRecord numbering={i} />) }

					<Search query="Ed sheeran" artist>
    					{({data, loading, error}) =>
    						data ? (
    							data.artists.items.map(artist => (
  
                        <ResultsRecord title={artist.name} image={artist.images} /> )) 
    						) : null
    					}
    				</Search>

    				<Artist id="7jy3rLJdDQY21OgRLCZ9sD">
    					{(artist, loading, error) => (
				    	    artist ? <h1>{artist.name}</h1> : <h1>empty</h1>
				 		)}
					</Artist>
					<SpotifyHooks id="7jy3rLJdDQY21OgRLCZ9sD" />

				</ArtistColumn>
				<TrackColumn>
					<ColumnTitle>Tracks</ColumnTitle>
					{ [...Array(5)].map((e, i) => <ResultsRecord numbering={i} primarycolor="1" />) }
				</TrackColumn>
				<AlbumColumn>
					<ColumnTitle>Albums</ColumnTitle>
					{ [...Array(5)].map((e, i) => <ResultsRecord numbering={i} />) }
				</AlbumColumn>
			</ResultsContainer>
		</SpotifyApiContext.Provider>
	)

}

export default ResultsPage;