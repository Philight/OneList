import React, { useState, useContext, useRef, useEffect } from "react";
import styled from 'styled-components';

import SideBarBody from "./SideBarBody";
import AutosizeInputUnderline from "./AutosizeInputUnderline";

import { PlaylistContext } from './../contexts/PlaylistContext';

import { faAngleDoubleRight, faAngleDoubleLeft, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const animationUrl = require("./../images/barsloading.svg");

const sidebarTextStyling2 = {
	fontSize: '14px',
	marginRight: '1px',
};

const ListButton = styled.button`
	visibility: ${props => props.sidebarShown ? 'hidden' : 'visible'};

	position: fixed;
	left: -2px;
	top: 14.5vh;
	z-index: 2;

	display: inline-flex;
	align-items: center;

	font-family: 'FugazOne';
	font-size: 20px;
	background-color: rgb(var(--tertiarycolor));
	color: white;

	outline: none;
	border: none;
	border-radius: 0px 40px 40px 0px;

	box-shadow: 4px 3px 10px 1px #111c22;
    cursor: pointer; 
    transition: 0.1s all;

	&:active {
		transform: scale(0.96); 
        /* Scaling button to 0.98 to its original size */ 
        box-shadow: 3px 2px 6px 1px #111c22;
	}
`

const ListHideButton = styled.button`
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

const Playlist = styled.div`
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
 	transition: 0.2s left;

 	height: calc(100vh - 10vh);

 	display: flex;
 	flex-direction: column;
 	align-items: center;
 	justify-content:center;

 	z-index: 1;
`

const LoadingOverlay = styled.div`
	width: 100%;
	height: 100%;
	position: absolute;

	background-color: rgba(var(--secondarycolor), 0.8);

	${props => props.isLoading ? 'display: flex;' : 'display: none;'};
	align-items: center;
	justify-content: center;

	z-index: 2;

`

const ListDetails = styled.span`
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

const SideBarHead = styled.div`
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

const CreateLinkButton = styled.button`
	align-self: center;

	border-radius: 10%/45%;
	outline: none;
	padding: 4px 12px;

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

const LinkArea = styled.div`
	position: relative;
	left: 8px;

	display: flex;
	flex-direction: row;
	align-items: center;

	// Icon style
	> a {
		font-size: 16px;

		${props => !props.linkIsSet 
			? `pointer-events: none; color: rgb(var(--silvercolor2));` 
			: 'color: rgb(var(--secondarycolor));'};
	}

	> a:visited {
		${props => !props.linkIsSet ? 'color: rgb(var(--silvercolor2));' : 'color: rgb(var(--secondarycolor));'};
	}
`

const Link = styled.input`
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
	border-radius: 10%/35%;
	
	margin-right: 2px;
`

const CopyText = styled.span`
	cursor: pointer;
`

const SideBar = (props) => {
	const playlistHeadRef = useRef(null);
	const [playlistHeadWidth, setPlaylistHeadWidth] = useState(null);

	const [isLoading, setIsLoading] = useState(false);

	const [playlistTitle, setPlaylistTitle] = useState("");

	const playlist = useContext(PlaylistContext);
	const [playlistIsEmpty, setPlaylistIsEmpty] = useState(true);

	const [inputLink, setInputLink] = useState("Link");
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

		let defaultTitle = "OneList";
		if (playlistTitle) {
			defaultTitle = playlistTitle;
		}

		const playlistObject = {
			title: defaultTitle,
			playlistArr: playlist
		}
		
		setIsLoading(true);
		fetch("/database/createplaylist", {
			method: 'post',
			headers: {
		    	'Accept': 'application/json',
	      		'Content-Type': 'application/json'
	    	},
			body: JSON.stringify({ playlistObject })
		})
			.then((result) => result.text())
			.then((result) => {
				setInputLink(result);
				setLinkIsSet(true);
				setIsLoading(false);
			})
			.catch(error => {
				alert(error);
			});

	}

	return (
		<div>
			<ListButton onClick={props.onClick} sidebarShown={props.sidebarShown}>
				<span style={sidebarTextStyling2}>Playlist</span>    		
	    		<FontAwesomeIcon icon={faAngleDoubleRight} />
			</ListButton>

			<Playlist sidebarShown={props.sidebarShown}>
				<LoadingOverlay isLoading={isLoading}>
					<img src={animationUrl} />
				</LoadingOverlay>

				<ListDetails>Playlist details</ListDetails>
				<SideBarHead 
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

					<CreateLinkButton onClick={sendPlaylistToServer} disabled={playlistIsEmpty}>
						Create link
					</CreateLinkButton> 
					<LinkArea linkIsSet={linkIsSet}>
						<Link value={inputLink} readonly linkIsSet={linkIsSet}/>
						<a href={inputLink} target="_blank"><FontAwesomeIcon icon={faExternalLinkAlt} /></a>
					</LinkArea>
					<CopyText 
						onClick={onCopy}
					>
						Copy
					</CopyText>
				</SideBarHead>

				<ListHideButton onClick={props.onClick} sidebarShown={props.sidebarShown}> 
					<FontAwesomeIcon icon={faAngleDoubleLeft} /> 
				</ListHideButton>

				<SideBarBody />

			</Playlist>
		</div>
	)
	
	
}

export default SideBar;