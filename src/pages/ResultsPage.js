import React from "react";
import styled from 'styled-components';

import SquareRecord from '../components/SquareRecord';
import RectangleRecord from '../components/RectangleRecord';

import { SpotifyContext } from '../contexts/SpotifyContext';
import { TestData } from './../test/TestData';

const SResultsContainer = styled.div`
	width: 70% ;
 	margin-left: ${props => props.sidebarShown ? '30%' : '15%'} ;
 	margin-right: ${props => props.sidebarShown ? '0' : '15%'} ;
 	transition: 0.3s margin;

 	margin-top: 10vh; /* - line height of NavBar */
 	padding-top: 1px;

 	//background-color: var(--primarycolor);
	background: rgba(0,0,0,0.5);

 	display: grid;
 	grid-template-columns: 0.5fr minmax(0, 1fr) 0.5fr;

`

const SArtistColumn = styled.div`
 	//border: rgb(var(--secondarycolor)) solid;
 	//border-width: 0 1px;
 	border-left: rgb(var(--secondarycolor)) solid 1px;
`

const SFlexContainer = styled.div`
	display: flex;
 	flex-direction: column;
 	align-items: center;

 		/* - Navigation height */
 	//height: calc(200vh - 20vh - 20vh);	
 	width: 100%;	
`

const STrackColumn = styled.div`
`

const SAlbumColumn = styled.div`
 	//border: rgb(var(--secondarycolor)) solid;
 	//border-width: 0 1px;
 	border-right: rgb(var(--secondarycolor)) solid 1px;
`

const SColumnTitle = styled.h1`
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
			<SResultsContainer sidebarShown={props.sidebarShown} >
				<SArtistColumn>
					<SColumnTitle>Artists</SColumnTitle>
					<SFlexContainer>
					
						{/* TestData.artists.map((artist, i) => <SquareRecord {...artist} /> ) */}
			
						{ artists.map((object, i) => <SquareRecord {...object} />) }	
					</SFlexContainer>
				</SArtistColumn>

				<STrackColumn>
					<SColumnTitle>Tracks</SColumnTitle>
					<SFlexContainer>

						{/* TestData.tracks.map((track, i) => <RectangleRecord {...track} /> ) */}

						{ tracks.map((object, i) => <RectangleRecord {...object} />) }
					</SFlexContainer>
				</STrackColumn>

				<SAlbumColumn>
					<SColumnTitle>Albums</SColumnTitle>
					<SFlexContainer>

						{/* TestData.albums.map((album, i) => <SquareRecord {...album} /> ) */}
						
						{ albums.map((object, i) => <SquareRecord {...object} />) }
					</SFlexContainer>
				</SAlbumColumn>
			</SResultsContainer>
		)}
		</SpotifyContext.Consumer>
	)

}

export default ResultsPage;