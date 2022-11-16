import React from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MUSIC_PLATFORMS, MUSIC_CLOUDS } from '../data/MUSIC_PLATFORMS.js';
//import { MUSICPLATFORM } from './IconDropdown';

const handleIconColor = (source) => {
	switch(source) {
		case MUSIC_PLATFORMS.SPOTIFY:
			return `color: ${MUSIC_CLOUDS[MUSIC_PLATFORMS.SPOTIFY]['color']};`;
		case MUSIC_PLATFORMS.SOUNDCLOUD:
			return `color: ${MUSIC_CLOUDS[MUSIC_PLATFORMS.SOUNDCLOUD]['color']};`;
		case MUSIC_PLATFORMS.YOUTUBE:
			return `color: ${MUSIC_CLOUDS[MUSIC_PLATFORMS.SPOTIFY]['color']};`;
		case MUSIC_PLATFORMS.ALLCLOUDS:
			return `color: ${MUSIC_CLOUDS[MUSIC_PLATFORMS.ALLCLOUDS]['color']};`;
		default:
			return "color: rgb(var(--tertiarycolor));";
	}
}

const SIconContainer = styled.a`
	margin: 0;

	//mix-blend-mode: ${props => props.column === 'artists' ? 'soft-light' : 'screen'}; //overlay

	${props => handleIconColor(props.source)}
	&:hover {
		${props => props.hover ? 'opacity: 1;' : ';' };
		mix-blend-mode: normal;
	}

	${props => props.styleCSS};

	z-index: 1;
`

const CloudIcon = (props) => {
	const handleIcon = () => {
		switch(props.source) {
			case MUSIC_PLATFORMS.SPOTIFY:
				return MUSIC_CLOUDS[MUSIC_PLATFORMS.SPOTIFY]['icon'];
			case MUSIC_PLATFORMS.SOUNDCLOUD:
				return MUSIC_CLOUDS[MUSIC_PLATFORMS.SOUNDCLOUD]['icon'];
			case MUSIC_PLATFORMS.YOUTUBE:
				return MUSIC_CLOUDS[MUSIC_PLATFORMS.YOUTUBE]['icon'];
			case MUSIC_PLATFORMS.ALLCLOUDS:
				return MUSIC_CLOUDS[MUSIC_PLATFORMS.ALLCLOUDS]['icon'];
			default:
				return MUSIC_CLOUDS[MUSIC_PLATFORMS.ALLCLOUDS]['icon'];
		}
	}

	return (
		<SIconContainer 
			href={props.url} target="_blank" 
			source={props.source} 
			hover={props.hover}
			styleCSS={props.styleCSS}
		>
			<FontAwesomeIcon 
				id={props.source} 
				icon={handleIcon()} 
			/>
		</SIconContainer>
	)
}

export default CloudIcon;