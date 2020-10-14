import React, { Component, useState } from "react";
import styled from 'styled-components';

import ResultsRecord from './ResultsRecord';
import { SpotifyContext } from './SpotifyContext';

const ResultsContainer = styled.div`
	width: 80% ;
 	margin-left: 10% ;
 	margin-right: 10% ;
 	margin-top: 10vh; /* - line height of NavBar */
 	padding-top: 1px;

 	/* background set in parent - background class */

 	display: grid;
 	grid-template-columns: 1fr 1fr 1fr;
`

const ArtistColumn = styled.div`
 	background-color: var(--primarycolor);

 	border-color: var(--secondarycolor);
 	border-style: solid;
 	border-width: 0 1px;
`

const FlexContainer = styled.div`
	display: flex;
 	flex-direction: column;
 	align-items: center;
 	/* - Navigation height */
 	height: calc(200vh - 20vh - 20vh);	
 	width: 100%;	
`

const TrackColumn = styled.div`
 	background-color: var(--primarycolor);	
`

const AlbumColumn = styled.div`
 	background-color: var(--primarycolor);

 	border-color: var(--secondarycolor);
 	border-style: solid;
 	border-width: 0 1px;
`

const ColumnTitle = styled.h1`
 	text-align: center;
	margin: 0vh;
	padding: 2vh;
	font-size: 4vh;
	font-weight: normal;
	background-color: ;
	color: white;
`

const ResultsPage = (props) => {
	return (
		<SpotifyContext.Consumer>
		{ ({ artists, albums, tracks }) => (
			<ResultsContainer>
				<ArtistColumn>
					<ColumnTitle>Artists</ColumnTitle>
					<FlexContainer>
					{/*
						{ [...Array(10)].map((e, i) => <ResultsRecord testMode="artist" numbering={i} />) }
						<div style={{
							borderTop: '0.5vh solid red',
							borderRight: '0.7vh solid red',
							borderBottom: '2vh solid green'
						}}>.s</div>
					*/}
						{ artists.map((object, i) => <ResultsRecord {...object} />) }	
					</FlexContainer>
				</ArtistColumn>

				<TrackColumn>
					<ColumnTitle>Tracks</ColumnTitle>
					<FlexContainer>
{/*
						<ResultsRecord testMode="track" />
*/}
						{ tracks.map((object, i) => <ResultsRecord {...object} />) }
					</FlexContainer>
				</TrackColumn>

				<AlbumColumn>
					<ColumnTitle>Albums</ColumnTitle>
					<FlexContainer>
{/*
						{ [...Array(10)].map((e, i) => <ResultsRecord testMode="album" numbering={i} />) }
*/}
						{ albums.map((object, i) => <ResultsRecord {...object} />) }
					</FlexContainer>
				</AlbumColumn>
			</ResultsContainer>
		)}
		</SpotifyContext.Consumer>
	)

}

export default ResultsPage;