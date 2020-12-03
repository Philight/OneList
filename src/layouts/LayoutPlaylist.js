import React, { useState } from "react";
import styled from 'styled-components';

import Navigation from './../components/Navigation';

const setHeight = (isLoading, overlayHeight) => {
	if (isLoading) {
		return `height: 100vh`;
	} else {
		return `min-height: 200vh; height: calc(${overlayHeight} + 100vh);`
	}
}

const BackgroundOtherStyle = styled.div`
	width: 100%;
	
	${props => setHeight(props.isLoading, props.overlayHeight)};

	background: rgba(0, 0, 0);

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;

	z-index: -4;

	::after {
		content: "";
		width: 100%;
		height: 100%;

		background: url(${props => props.url}) no-repeat center fixed;
		//background-repeat: no-repeat;
		//background-position: center;
		background-size: contain;

		//filter: brightness(30%) blur(1px);

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -3;
	} 
`

const Overlay1 = styled.div`
	width: 100%;

	background: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 1));
	//background: rgba(0, 0, 0, 0.2);

	${props => setHeight(props.isLoading, props.overlayHeight)};
	
    position: absolute;
    top: 0; // Navigation
    left: 0;
	right: 0;
	bottom: 0;

    z-index: -2;
`

const Overlay2 = styled(Overlay1)`

	min-height: 100vh;
	height: ${props => props.isLoading ? '100vh' : props.overlayHeight };

	background: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.01));
	//background: linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgb(59, 59, 59, 0.9), rgb(119, 119, 119, 0.9), rgb(185, 185, 185, 0.9), rgb(255, 255, 255, 0.9));
`




const LayoutPlaylist = (props) => { // {children}
	const [isLoading, setIsLoading] = useState(false);

	const [selectedTrack, setSelectedTrack] = useState(0);
	const [bkgUrl, setBkgUrl] = useState("");
	const [overlayHeight, setOverlayHeight] = useState("auto");

	const updateLoading = (loading) => {
		setIsLoading(loading);
	}

	const updateBkg = (selectedIndex, bkgUrl) => {
		setSelectedTrack(selectedIndex);
		setBkgUrl(bkgUrl);
	}

	const updateOverlay = (containerHeight) => {
		setOverlayHeight( `${containerHeight}px`);
	}

	return (
		<div>
		{/*}
			<BackgroundOtherStyle url={playlist[0].images.url} /> 
		*/}
			<BackgroundOtherStyle 
				url={bkgUrl} 
				overlayHeight={overlayHeight}
				isLoading={isLoading}
			/> 
			
			<Overlay1 overlayHeight={overlayHeight} isLoading={isLoading} />
			<Overlay2 overlayHeight={overlayHeight} isLoading={isLoading} />
		
	    	<Navigation layout="LayoutPlaylist" />
			{ React.cloneElement(props.children, { 
				updateBkg: updateBkg,
				updateOverlay: updateOverlay,
				updateLoading: updateLoading,
			}) }
	    </div>
	)
	
}



export { LayoutPlaylist };