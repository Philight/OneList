import React, { useState } from "react";
import styled, { keyframes } from 'styled-components';

import RecordData from './RecordData';
import CloudIcon from './CloudIcon';

const defaultImgUrl = require("./../images/spotifysquare.jpg");

const Container = styled.div`
	width: 90%;
	padding: 45% 0;
	position: relative;

	margin-bottom: 1.3vh;
	border: 0.5vh solid rgb(var(--secondarycolor));
	
	display: flex;
	align-items: center;
	justify-content: center;

	//z-index: 0;
	overflow: hidden;

	&:hover {
		border-color: rgb(var(--tertiarycolor));

	}
`

const ImageSquare = styled.div`
	position: absolute;
	z-index: 0;
	width: 100%;
	height: 100%;	

	display: flex;
	align-items: center;
	justify-content: center;	

	&:hover::after {
		filter: brightness(40%) blur(3px);	
	}

	::after {
		content: "";
		background-image: url(${props => props.testMode ? defaultImgUrl : props.image}); 
		background-size: cover;
		background-repeat: no-repeat;
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 0;
	//right: 200px;
	}

`

const CenterContent = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	padding: 0px 0;
	margin: 0px 10px;
	border: 1px solid red;

	overflow: hidden;
	text-overflow: clip;
`

const cloudIconStyle = {
	css: `
		font-size: 30px;
		color: gray;
		mix-blend-mode: screen;
	`,
}

const SquareRecord = (props) => {
	let { source, url, images, name, artists, album } = props;

	const [isShown, setIsShown] = useState(false);
	
	return (
		<Container primarycolor={props.primarycolor}>
        	<ImageSquare 
        		image={() => images ? images.url : defaultImgUrl} 
        		onMouseEnter={() => setIsShown(true)}
				onMouseLeave={() => setIsShown(false)}
			>
				<CenterContent>
            		<RecordData {...props} isShown={isShown} />
            		<CloudIcon 
            			source={source}
            			url={url} 
            			hover 
            			styleCSS={cloudIconStyle.css}
            		/>
            	</CenterContent>
        	</ImageSquare>
		</Container>
	)

}

export default SquareRecord;