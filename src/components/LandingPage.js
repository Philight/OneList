import React, { Component } from "react";
import styled from "styled-components";

import SearchBar from './SearchBar';

const StyleLandingPage = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-wrap: wrap;
	align-content: center;
	justify-content: center;

	position: absolute;
	top: 0;
  	left: 0;
  	right: 0;
  	bottom: 0;
`

const StyleTextTemplate = styled.label`
	width: 100%;
	text-align: center;
	color: white;
	word-spacing: 5px;
`

const StyleTitle = styled(StyleTextTemplate)`
	font-family: 'AlegreyaItalic';
	font-size: 48px;
`

const StyleSubtitle = styled(StyleTextTemplate)`
	font-family: 'Alegreya';
	font-size: 30px;
`

/* position because of hidden button*/
const moverightStyle = {
	position: 'relative',
	right: '-14px',
	marginTop: '10px',	
}

const LandingPage = (props) => {
	return (
		<StyleLandingPage>
			<StyleTitle>
				Every favourite song 
				<br />
				in one place
			</StyleTitle>
			<StyleSubtitle>
				Tap below to create your own list.
			</StyleSubtitle> 
			<div style={moverightStyle}> <SearchBar layout="LayoutLanding"/> </div>
		</StyleLandingPage>
	)
}


export default LandingPage;