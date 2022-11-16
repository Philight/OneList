import React, { useState } from "react";
import styled from 'styled-components';

import Navigation from './../main/Navigation';
import SideBar from './../main/SideBar';
import LoadingPage from './../pages/LoadingPage';

import { SpotifyContext } from './../contexts/SpotifyContext';

import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const backgroundUrl = require("../assets/images/unicorn.jpg");

const BackgroundOtherStyle = styled.div`
	width: 100%;
	/* - Navigation height 10vh */
	height: 100%;

	::after {
		content: "";
		width: 100%;
		height: 100%;

		background: url(${backgroundUrl});
		background-repeat: no-repeat;
		background-size: cover;

		filter: brightness(30%) blur(1px);

		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: -2;
	} 
`

const LayoutResults = (props) => { // {children}
	const [sidebarShown, setSidebarShown] = useState(false);

	const handleClick = () => {
		setSidebarShown(!sidebarShown);
	}

	return (
		<SpotifyContext.Consumer>
		{ ({ readyState }) => (
			<div>
			{ !readyState 
				? <LoadingPage /> 
				: <div>
					<BackgroundOtherStyle />
		    		<Navigation layout="LayoutResults" />

		    		<SideBar onClick={handleClick} sidebarShown={sidebarShown} />
					{ React.cloneElement(props.children, { sidebarShown: sidebarShown }) }
				</div> 
			}
		    </div>
    	)}
		</SpotifyContext.Consumer>
	)	
}



export { LayoutResults };