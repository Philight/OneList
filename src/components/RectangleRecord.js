import React, { useEffect, useState, useContext } from "react";
import styled, { keyframes } from 'styled-components';

import RecordData from './RecordData';
import CloudIcon from './CloudIcon';

import { PlaylistContext, PlaylistDispatchContext } from './../contexts/PlaylistContext';

import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const imageUrl = require("../assets/images/spotifysquare.jpg");

const fillColor = keyframes`
  100% {
    color: lime;
  }
`

const Checkmark = styled.span`
	display: ${props => props.showCheckmark ? 'inline' : 'none'};
	z-index: 0;
	background-color: transparent;
	color: #FFFFFF;
	border: none;
	outline: none;

	font-size: 30px;
	margin: 10px;
	
	animation: 0.8s ${fillColor} ease-in;
	animation-fill-mode: forwards;
}
`

const PlusButton = styled.button`
	display: ${props => props.showCheckmark ? 'none' : 'inline'};
	z-index: 0;
	background-color: transparent;
	color: white;
	border: none;
	outline: none;

	mix-blend-mode: soft-light; //overlay
	font-size: 30px;
	margin: 5px;

    filter: drop-shadow(0 0 12px black);
    cursor: pointer; 

    transition: 0.1s all; 

    &:active {
    	transform: scale(0.97); 
        /* Scaling button to 0.98 to its original size */ 
        filter: drop-shadow(0 0 8px white); 
        /* Lowering the shadow */ 
        color: rgb(var(--tertiarycolor));
        mix-blend-mode: overlay;
    }
`

const Container = styled.div`
	margin-bottom: 2.6vh;
	width: 95%;
		
	//border: 0.7vh solid rgb(255, 255, 255, 0.1);
	border-radius: 10%/30%;
	flex: 0 0 9%;	

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;

	position: relative;
`

const TransparentSquare = styled.div`
	position: absolute;
	width: 100%;
	height: 100%;

	background-color: gray;
	border-radius: inherit;

	border: 0.7vh solid white;

	//mix-blend-mode: soft-light;
	//opacity: 0.2;

	mix-blend-mode: screen;
	opacity: 0.1;
   	
   	left: -0.7vh; // border
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

	z-index: 0;
`

const ImageSquare = styled.div`
	background-image: url(${props => props.testMode ? imageUrl : props.image}); 
	background-size: auto;
	background-position: center;
	background-repeat: no-repeat;

	filter: brightness(60%) blur(1px);
	opacity: 0.9;
	border-right: 1px solid rgb(var(--tertiarycolor));
	border-left: 1px solid rgb(var(--tertiarycolor));

   	left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;

	width: 75%;
	height: 100%;
	position: absolute;
	z-index: 0;

`

const cloudIconStyle = {
	css: `
		margin: 10px;
		font-size: 30px;
		color: #FFFFFF;
		mix-blend-mode: soft-light;
	`,
}

const RectangleRecord = (props) => {
	let { id, source, url, images, name, artists, album, testMode } = props;

	const playlist = React.useContext(PlaylistContext);
	const setPlaylist = useContext(PlaylistDispatchContext);

	const [showCheckmark, setShowCheckmark] = useState(false); 

	useEffect(() => {
		setShowCheckmark(false);
	}, [props]);

	const handlePlus = (trackObject) => {
		const newPlaylist = Array.from(playlist);
		if (newPlaylist.find( element => element['id'] === trackObject.id )) {
			return;
		}

		newPlaylist.push(trackObject);
		setPlaylist(newPlaylist);

		setTimeout(function() {
     		setShowCheckmark(true);
  		}, 250);

	}

	return (
		<Container primarycolor={props.primarycolor}>
			<TransparentSquare />
			{ (images) ? <ImageSquare image={images.url} /> : <ImageSquare testMode missingImg /> }
			<CloudIcon 
				url={url} 
				source={source} 
				hover
				styleCSS={cloudIconStyle.css} 
			/>
			<RecordData {...props} isShown="true" />

			<PlusButton 
				onClick={() => handlePlus({id, source, url, images, name, artists, album})}
				showCheckmark={showCheckmark}
			>
				<FontAwesomeIcon icon={faPlus} />
			</PlusButton>	
			<Checkmark 				
				showCheckmark={showCheckmark}
			>
				<FontAwesomeIcon icon={faCheck} />
			</Checkmark>
		</Container>
	)

}

export default RectangleRecord;