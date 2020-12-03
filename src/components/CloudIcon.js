import React from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { searchSrc } from './IconDropdown';

const handleIconColor = (source) => {
	switch(source) {
		case searchSrc.SPOTIFY:
			return "color: #1DB954;";
		case searchSrc.SOUNDCLOUD:
			return "color: #FFFFFF;";
		case searchSrc.YOUTUBE:
			return "color: #FF0000;";
		default:
			return "color: rgb(var(--tertiarycolor));";
	}
}

const IconContainer = styled.a`
	margin: 0;

	//mix-blend-mode: ${props => props.column === 'artists' ? 'soft-light' : 'screen'}; //overlay

	${props => props.hover ? ';' : handleIconColor(props.source)};

	&:hover {
		${props => props.hover ? handleIconColor(props.source) : ';' };
		mix-blend-mode: normal;
	}

	${props => props.styleCSS};

	z-index: 1;
`

const CloudIcon = (props) => {
	const handleIcon = () => {
		switch(props.source) {
			case searchSrc.SPOTIFY:
				return faSpotify;
			case searchSrc.SOUNDCLOUD:
				return faSoundcloud;
			case searchSrc.YOUTUBE:
				return faYoutube;
			default:
				return faCompactDisc;
		}
	}

	return (
		<IconContainer 
			href={props.url} target="_blank" 
			source={props.source} 
			hover={props.hover}
			styleCSS={props.styleCSS}
		>
			<FontAwesomeIcon 
				id={props.source} 
				icon={handleIcon()} 
			/>
		</IconContainer>
	)
}

export default CloudIcon;