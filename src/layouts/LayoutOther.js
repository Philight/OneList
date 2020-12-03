import React, { useState } from "react";
import styled from 'styled-components';

import Navigation from './../components/Navigation';
import SideBar from './../components/SideBar';
import LoadingPage from './../components/LoadingPage';

import { SpotifyContext } from './../components/SpotifyContext';

import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const backgroundUrl = require("./../images/unicorn.jpg");

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

const LayoutOther = (props) => { // {children}
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
		    		<Navigation layout="LayoutOther" />

		    		<SideBar onClick={handleClick} sidebarShown={sidebarShown} />
					{ React.cloneElement(props.children, { sidebarShown: sidebarShown }) }
				</div> 
			}
		    </div>
    	)}
		</SpotifyContext.Consumer>
	)	
}



export { LayoutOther };