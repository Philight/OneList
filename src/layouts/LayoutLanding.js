import React from "react";
import styled from 'styled-components';

import Navigation from './../components/Navigation';

const backgroundUrl = require("./../images/landingpage.jpg");

const StyleBackgroundLanding = styled.div`
	width: 100%;
	height: 100%;
	background-image: url(${backgroundUrl});  
	filter: brightness(60%) blur(1px);
	background-repeat: no-repeat;
	background-size: cover;

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -2;
`

const LayoutLanding = ({children}) => (
	<div>
		<StyleBackgroundLanding />
    	<Navigation />
    	{children}
    </div>
)

export { LayoutLanding };