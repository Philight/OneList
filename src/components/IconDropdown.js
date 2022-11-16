import React, { Component } from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { MUSIC_PLATFORMS, MUSIC_CLOUDS } from '../data/MUSIC_PLATFORMS.js';
/*
export const MUSIC_PLATFORMS = {
	SPOTIFY: 'spotify',
	SOUNDCLOUD: 'soundcloud',
	YOUTUBE: 'youtube',
	ALLCLOUDS: 'allclouds'
}
*/
const musicClouds = [
	{ id: MUSIC_PLATFORMS.SPOTIFY, icon: faSpotify },
	{ id: MUSIC_PLATFORMS.YOUTUBE, icon: faYoutube },
	{ id: MUSIC_PLATFORMS.SOUNDCLOUD, icon: faSoundcloud },
	{ id: MUSIC_PLATFORMS.ALLCLOUDS, icon: faCompactDisc },
]

const SDropdown = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;

	//border: 1px red solid;
`

const SDropdownList = styled.ul`
	list-style: none; 
	margin: 0;
	padding: 0;

	position: absolute;
	/display: ${props => props.show ? 'flex' : 'none'};

	display: flex;
	opacity: ${props => props.show ? '1' : '0'};
	top: ${props => props.show ? '0' : '-100px'};
	visibility: ${props => props.show ? 'visible' : 'hidden'};
	flex-direction: column;

	transition: 0.3s opacity cubic-bezier(1,-0.01,.71,.7), 0.3s top cubic-bezier(.01,1,.75,.85); 
`
{/* ${SDropdown}:hover & {
		display: list-item;
	}
*/}
    
const handleColor = source => {
	switch(source) {
		case MUSIC_PLATFORMS.SPOTIFY:
			return "color: #1DB954; background-color: #000000;";
		case MUSIC_PLATFORMS.SOUNDCLOUD:
			return "color: #FFFFFF; background-color: #FF3A00;";
		case MUSIC_PLATFORMS.YOUTUBE:
			return "color: #FF0000; background-color: #FFFFFF;";
		case MUSIC_PLATFORMS.ALLCLOUDS:
			return "color: #000000; background-color: #FFFFFF;";
		default:
			return;
	}
}

/* Icon positioning, blend based on layout */
const handleLayout = (layout) => {
	if (layout === 'LayoutLanding') {
		return `
				mix-blend-mode: screen;`
	} else {
	// LayoutOther
		return `line-height: normal; 
				mix-blend-mode: normal;`
	}
}

const SItemPlaceholder = styled.li`
	width: 45px;
	height: 45px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    ${props => props.hidePlaceholder ? 'visibility: hidden;' : '' }

    list-style: none;
    text-align: center;

    ${props => props.show 
    	? handleColor(props.id) 
    	: "color: transparent; background-color: transparent; border: 4px solid transparent;"}

 	${props => handleLayout(props.layout)};
	${props => handleColor(props.id)};

    padding: 0px;
    font-size: 30px;
    border-radius: 50%;
    border: 3.4px solid rgba(var(--silvercolor2), 1);
`

const SItem = styled(SItemPlaceholder)`
	margin-bottom: 2px;
	${props => handleColor(props.id)};
`

class ItemDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cloudId: MUSIC_PLATFORMS.SPOTIFY,
//			currentIcon: faSpotify,
			showSelectionDropdown: false,
		}
		this.handleSelectIcon = this.handleSelectIcon.bind(this);
		this.handleCloseList = this.handleCloseList.bind(this);
		this.handleChooseIcon = this.handleChooseIcon.bind(this);
		this.handleOutsideClick = this.handleOutsideClick.bind(this);
	}

	handleSelectIcon(event) {
		document.addEventListener("click", this.handleOutsideClick, false);
		this.setState({ showSelectionDropdown: true });
	}

	handleCloseList() {
		document.removeEventListener("click", this.handleOutsideClick, false);
		this.setState({ showSelectionDropdown: false });
	}

	handleChooseIcon(event, cloudId) {
		switch(cloudId) {
			case MUSIC_PLATFORMS.SPOTIFY:
//				this.setState({ currentIcon: faSpotify, cloudId: MUSIC_PLATFORMS.SPOTIFY, showSelectionDropdown: false });
				this.setState({ cloudId: MUSIC_PLATFORMS.SPOTIFY, showSelectionDropdown: false });
				this.props.passSource(MUSIC_PLATFORMS.SPOTIFY);
				break;
			case MUSIC_PLATFORMS.SOUNDCLOUD:
//				this.setState({ currentIcon: faSoundcloud, cloudId: MUSIC_PLATFORMS.SOUNDCLOUD, showSelectionDropdown: false });
				this.setState({ cloudId: MUSIC_PLATFORMS.SOUNDCLOUD, showSelectionDropdown: false });
				this.props.passSource(MUSIC_PLATFORMS.SOUNDCLOUD);
				break;
			case MUSIC_PLATFORMS.YOUTUBE:
//				this.setState({ currentIcon: faYoutube, cloudId: MUSIC_PLATFORMS.YOUTUBE, showSelectionDropdown: false });
				this.setState({ cloudId: MUSIC_PLATFORMS.YOUTUBE, showSelectionDropdown: false });
				this.props.passSource(MUSIC_PLATFORMS.YOUTUBE);
				break;
			case MUSIC_PLATFORMS.ALLCLOUDS:
//				this.setState({ currentIcon: faCompactDisc, cloudId: MUSIC_PLATFORMS.ALLCLOUDS, showSelectionDropdown: false });
				this.setState({ cloudId: MUSIC_PLATFORMS.ALLCLOUDS, showSelectionDropdown: false });
				this.props.passSource(MUSIC_PLATFORMS.ALLCLOUDS);
				break;	
		}
	}

	handleOutsideClick = e => {
		if (!this.node.contains(e.target)) this.handleCloseList();
	};

	render () {
		return (
			<SDropdown
		        ref={node => { this.node = node; }}
			>
				<SItemPlaceholder 
					id={this.state.cloudId} 
					layout={this.props.layout}
					hidePlaceholder={this.state.showSelectionDropdown ? true : false}
					onClick={event => this.handleSelectIcon(event)}
				>
					<FontAwesomeIcon 
						id={this.state.cloudId} 
						icon={MUSIC_CLOUDS[this.state.cloudId]['icon']} 
						fixedWidth
					/>
				</SItemPlaceholder>

				<SDropdownList show={this.state.showSelectionDropdown}>
					{ Object.keys(MUSIC_CLOUDS).map(cloudKey => 
//					{ musicClouds.map(cloud => 
						<SItem id={cloudKey} 
							layout={this.props.layout}
							onClick={event => this.handleChooseIcon(event, cloudKey)}
						>
							<FontAwesomeIcon 
								id={cloudKey}
								icon={MUSIC_CLOUDS[cloudKey]['icon']}
							/>
						</SItem>
					) }			
				</SDropdownList>
			</SDropdown>
		)
	}
	
}

export default ItemDropdown;