import React from "react";
import styled from 'styled-components';

import Navigation from './../components/Navigation';

const StyleBackgroundOther = styled.div`
	width: 100%;
	/* - Navigation height */
	height: calc(200vh - 20vh);

	background-color: var(--secondarycolor);
	background-repeat: no-repeat;
	background-size: cover;

	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: -2;
`

const LayoutOther = ({children}) => (
	<div>
		<StyleBackgroundOther />
    	<Navigation layout="LayoutOther"/>
    	{children}
    </div>
)

export { LayoutOther };