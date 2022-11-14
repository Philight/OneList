import React from "react";
import styled from 'styled-components';

import SquareRecord from '../components/SquareRecord';
import RectangleRecord from '../components/RectangleRecord';

import { SpotifyContext } from '../contexts/SpotifyContext';
import { TestData } from './../test/TestData';

const ResultsContainer = styled.div`
	width: 70% ;
 	margin-left: ${props => props.sidebarShown ? '30%' : '15%'} ;
 	margin-right: ${props => props.sidebarShown ? '0' : '15%'} ;
 	transition: 0.2s margin;

 	margin-top: 10vh; /* - line height of NavBar */
 	padding-top: 1px;

 	//background-color: var(--primarycolor);
	background: rgba(0,0,0,0.5);

 	display: grid;
 	grid-template-columns: 0.5fr minmax(0, 1fr) 0.5fr;

`

const ArtistColumn = styled.div`
 	//border: rgb(var(--secondarycolor)) solid;
 	//border-width: 0 1px;
 	border-left: rgb(var(--secondarycolor)) solid 1px;
`

const FlexContainer = styled.div`
	display: flex;
 	flex-direction: column;
 	align-items: center;

 		/* - Navigation height */
 	//height: calc(200vh - 20vh - 20vh);	
 	width: 100%;	
`

const TrackColumn = styled.div`
`

const AlbumColumn = styled.div`
 	//border: rgb(var(--secondarycolor)) solid;
 	//border-width: 0 1px;
 	border-right: rgb(var(--secondarycolor)) solid 1px;
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
			<ResultsContainer sidebarShown={props.sidebarShown} >
				<ArtistColumn>
					<ColumnTitle>Artists</ColumnTitle>
					<FlexContainer>
					
						{/* TestData.artists.map((artist, i) => <SquareRecord {...artist} /> ) */}
			
						{ artists.map((object, i) => <SquareRecord {...object} />) }	
					</FlexContainer>
				</ArtistColumn>

				<TrackColumn>
					<ColumnTitle>Tracks</ColumnTitle>
					<FlexContainer>

						{/* TestData.tracks.map((track, i) => <RectangleRecord {...track} /> ) */}

						{ tracks.map((object, i) => <RectangleRecord {...object} />) }
					</FlexContainer>
				</TrackColumn>

				<AlbumColumn>
					<ColumnTitle>Albums</ColumnTitle>
					<FlexContainer>

						{/* TestData.albums.map((album, i) => <SquareRecord {...album} /> ) */}
						
						{ albums.map((object, i) => <SquareRecord {...object} />) }
					</FlexContainer>
				</AlbumColumn>
			</ResultsContainer>
		)}
		</SpotifyContext.Consumer>
	)

}

export default ResultsPage;