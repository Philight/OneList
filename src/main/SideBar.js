import React, { useState, useContext, useRef, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

import SideBarBody from "../components/SideBarBody";
import AutosizeInputUnderline from "../components/AutosizeInputUnderline";

import { VARIABLES } from "../data/ENV.js";
import { PlaylistContext } from './../contexts/PlaylistContext';

import { faAngleDoubleRight, faAngleDoubleLeft, faAngleDoubleUp, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ReactComponent as IPulseLoading } from "../assets/images/loaders/pulseloading.svg";
import { ReactComponent as IBarsLoading } from "../assets/images/loaders/barsloading.svg";

const API_CREATEPLAYLISTURL = `${VARIABLES.API_HOST}:${VARIABLES.API_PORT}/one-list/database/createplaylist`;
const PLAYLISTURL = (`${VARIABLES.APP_URL+VARIABLES.BASENAME}/playlist`);

const sidebarTextStyling2 = {
	fontSize: '14px',
	marginRight: '1px',
};

const SListButton = styled.button`
	/visibility: ${props => props.sidebarShown ? 'hidden' : 'visible'};

	position: fixed;
    left: -14px;
    left: ${props => props.sidebarShown ? '-100px' : '-14px'};
    top: 13.5vh;
	z-index: 2;
	transform: rotate(90deg);

	display: inline-flex;
	flex-direction: column;
	align-items: center;

	font-family: 'FugazOne';
	font-size: 20px;
	background-color: rgb(var(--tertiarycolor));
	color: white;

	outline: none;
	border: none;
	border-radius: 0px 40px 40px 0px;
	border-radius: 90px 90px 0px 0px;

	box-shadow: 4px 3px 10px 1px #111c22;
    cursor: pointer; 
    transition: 0.3s left ease-in-out;

	&:active {
		transform: scale(0.96); 
        /* Scaling button to 0.98 to its original size */ 
        box-shadow: 3px 2px 6px 1px #111c22;
	}
`

const SListHideButton = styled.button`
	visibility: ${props => props.sidebarShown ? 'visible' : 'hidden'};

	position: absolute;
	left: -1px;
	top: 4vh;//12vh;////32vh;//12vh; 

	outline: none;
	border: none;
	padding: 4px 8px;
	font-size: 14px;
	color: white;
	background-color: rgb(var(--tertiarycolor));

	border-radius: 6px;
    box-shadow: 3px 2px 4px 1px black;
    cursor: pointer; 
    //transition: 0.09s all;

	&:active {
		transform: scale(0.96); 
        /* Scaling button to 0.98 to its original size */ 
        box-shadow: 2px 1px 2px 1px black;
	}
`

const SPlaylist = styled.div`
	visibility: ${props => props.sidebarShown ? 'visible' : 'visible'};

	width: 30%;
	margin-top: 2px; /* - line height of NavBar */
	//border: 2px solid black;

	border-radius: 8px;//30px;
 	background-color: ${props => props.isLoading ? 'rgba(var(--silvercolor2))' : 'rgba(var(--silvercolor2), 0.6)'}; 
 	//background-color: rgba(255,255,255, 0.5);
 	color: white;

 	position: fixed;
 	left: ${props => props.sidebarShown ? '0' : '-30%'};
 	transition: 0.3s left ease-out;

 	height: calc(100vh - 10vh);

 	display: flex;
 	flex-direction: column;
 	align-items: center;
 	justify-content:center;

 	z-index: 1;
`

const SLoadingOverlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;

	background-color: rgba(var(--secondarycolor), 0.8);

	${props => props.isLoading ? 'display: flex;' : 'display: none;'};
	align-items: center;
	justify-content: center;

	z-index: 2;

`

const SListDetails = styled.span`
	align-self: flex-start;

	width: 100%;
	height: 7%;
	margin-top: 5%;
	
	margin-left: 9%;

	font-size: 26px;
	font-family: 'Alegreya';

    border-radius: 8px 8px 0 0;	
    //border: 1px solid red;

`

const SSideBarHead = styled.div`
	//border: 1px solid var(--tertiarycolor);
	width: 100%;
	height: 30%;
      
    border-radius: 4px 4px 0 0;
	//margin-top: 26px;
	color: rgb(var(--secondarycolor));
	background-color: white;

	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	margin-bottom: 3%;
`

const playlistTitleStyle = {
	css: `
		font-size: 20px;
	`
}

const playlistTitleWrapperStyle = {
	css: `
		align-self: flex-start;
		margin-left: 9%;
		margin-bottom: 8%;
		
		border-color: rgb(var(--silvercolor2));
	`
}

const playlistTitleOnFocus = {
	css: `
		border-color: rgb(var(--tertiarycolor));
	`
}

const SCreateLinkButton = styled.button`
	align-self: center;

	border-radius: 100px;
	border: none;
	outline: none;
	padding: 6px 18px 5px;

	background-color: rgb(var(--tertiarycolor));
	color: white;
	${props => props.disabled && `
		cursor: not-allowed;
		background-color: rgb(var(--silvercolor2));
	`};

	font-weight: bold;
	font-size: 18px;

	margin-bottom: 2%;
`

const SLinkArea = styled.div`
	position: relative;
	left: 8px;


	display: flex;
	flex-direction: row;
	align-items: center;

	// Icon style
	> a {
		font-size: 16px;
	    margin-left: 1px;
	    margin-bottom: 2px;

		${props => !props.linkIsSet 
			? `pointer-events: none; color: rgb(var(--silvercolor2));` 
			: 'color: rgb(var(--secondarycolor));'};
	}

	> a:visited {
		${props => !props.linkIsSet ? 'color: rgb(var(--silvercolor2));' : 'color: rgb(var(--secondarycolor));'};
	}
`

const SLink = styled.input`
	outline: none;
	width: 160px;
	padding: 1px;
	text-align: center;

	${props => !props.linkIsSet 
		? `background-color: white; border: 4px solid rgb(var(--silvercolor2));`
		: `	background-color: rgb(var(--primarycolor)); 
			color: white; 
			border: 4px solid rgb(var(--tertiarycolor));`
	};
	border-radius: 10px;
	
	margin-right: 2px;
`

const SCopyText = styled.span`
	cursor: pointer;
`

const SideBar = (props) => {
	const playlistHeadRef = useRef(null);
	const [playlistHeadWidth, setPlaylistHeadWidth] = useState(null);

	const [isLoading, setIsLoading] = useState(false);

	const [playlistTitle, setPlaylistTitle] = useState("");

	const playlist = useContext(PlaylistContext);
	const [playlistIsEmpty, setPlaylistIsEmpty] = useState(true);

	const [inputLink, setInputLink] = useState("");
	const [linkIsSet, setLinkIsSet] = useState(false);

	useEffect(() => {
		if (!isLoading) {
			setPlaylistHeadWidth(playlistHeadRef.current.offsetWidth);
			//alert("playhead width: "+playlistHeadWidth);
		}
	}, []);

	useEffect(() => {
		if (playlist.length > 0) {
			setPlaylistIsEmpty(false);
		}
		else {
			setPlaylistIsEmpty(true);
		}
	}, [playlist]);

	const handleTitleInput = (event) => {
		setPlaylistTitle(event.target.value);
	}

	const onCopy = () => {
		navigator.clipboard.writeText(inputLink);
	}

	const sendPlaylistToServer = () => {
		//alert("Sending playlist to server");

		let defaultTitle = "one.list";
		if (playlistTitle) {
			defaultTitle = playlistTitle;
		}

		const playlistObject = {
			title: defaultTitle,
			playlistArr: playlist
		}
		
		setIsLoading(true);
		fetch(API_CREATEPLAYLISTURL, {
			method: 'post',
			headers: {
		    	'Accept': 'application/json',
	      		'Content-Type': 'application/json'
	    	},
			body: JSON.stringify({ playlistObject })
		})
			.then((result) => result.text())
			.then((playlistId) => {
				setInputLink(`${PLAYLISTURL}/${playlistId}`);
				setLinkIsSet(true);
				setIsLoading(false);
			})
			.catch(error => {
				alert(error);
			});

	}

	return (
		<div>
			<SListButton onClick={props.onClick} sidebarShown={props.sidebarShown}>
	    		<FontAwesomeIcon icon={faAngleDoubleUp} style={{}} size="sm" />
				<span style={sidebarTextStyling2}>Playlist</span>    		
			</SListButton>

			<SPlaylist sidebarShown={props.sidebarShown}>
				<SLoadingOverlay isLoading={isLoading}>
					<IBarsLoading />
				</SLoadingOverlay>

				<SListDetails>Playlist details</SListDetails>
				<SSideBarHead 
					ref={playlistHeadRef}
				>
					<AutosizeInputUnderline 
						value={playlistTitle}
						onChange={handleTitleInput}
						placeholder="The Title"
						minWidth={100}
						maxWidth={playlistHeadWidth-70}
						inputCSS={playlistTitleStyle.css}
						wrapperCSS={playlistTitleWrapperStyle.css}
						onFocusCSS={playlistTitleOnFocus.css}
					/>

					<SCreateLinkButton onClick={sendPlaylistToServer} disabled={playlistIsEmpty}>
						Create link
					</SCreateLinkButton> 
					<SLinkArea linkIsSet={linkIsSet}>
						<SLink value={inputLink} readonly linkIsSet={linkIsSet} placeholder="<LINK>" />
						<a href={inputLink} target="_blank"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
					</SLinkArea>
					<SCopyText 
						onClick={onCopy}
					>
						Copy
					</SCopyText>
				</SSideBarHead>

				<SListHideButton onClick={props.onClick} sidebarShown={props.sidebarShown}> 
					<FontAwesomeIcon icon={faAngleDoubleLeft} /> 
				</SListHideButton>

				<SideBarBody />

			</SPlaylist>
		</div>
	)
	
	
}

export default SideBar;