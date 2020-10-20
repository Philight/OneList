import React, { Component } from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const searchOp = {
	SPOTIFY: 'spotify',
	SOUNDCLOUD: 'soundcloud',
	YOUTUBE: 'youtube',
	ALLCLOUDS: 'allclouds'
}

const Dropdown = styled.div`
	position: relative;
`

const DropdownList = styled.ul`
	list-style: none; 

	margin: 0;
	padding: 0;

	display: none;
	top: 0px;
	position: absolute;

`
{/* ${Dropdown}:hover & {
		display: list-item;
	}
*/}
    
const handleColor = source => {
	switch(source) {
		case searchOp.SPOTIFY:
			return "color: #08FF00; background-color: #000000;";
		case searchOp.SOUNDCLOUD:
			return "color: #FFFFFF; background-color: #FF3A00;";
		case searchOp.YOUTUBE:
			return "color: #FF0000; background-color: #FFFFFF;";
		case searchOp.ALLCLOUDS:
			return "color: #000000; background-color: #FFFFFF;";
	}
}

/* Icon positioning based on layout */
const handleLayout = (layout) => {
	if (layout === 'LayoutLanding') {
		return "line-height: 54px; height: 54px;"
	} else {
	// LayoutOther
		return "line-height: 60px; height: 54px;"
	}
}

const Item = styled.li`
	width: 100%;

    display:list-item;
    list-style: none;
    text-align: center;

    ${props => handleColor(props.id)}
 	${props => handleLayout(props.layout)}

    padding: 1px;
    font-size: 44px;
`

class ItemDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIcon: faSpotify,
			toggleDropdownList: 'none',
			id: searchOp.SPOTIFY,
		}
	}

	handleSelectIcon(event) {
		this.setState({ toggleDropdownList: 'list-item' });
	}

	handleChooseIcon(event) {
		switch(event.target.id) {
			case searchOp.SPOTIFY:
				this.setState({ currentIcon: faSpotify, id: searchOp.SPOTIFY, toggleDropdownList: 'none' });
				this.props.passOption(searchOp.SPOTIFY);
				break;
			case searchOp.SOUNDCLOUD:
				this.setState({ currentIcon: faSoundcloud, id: searchOp.SOUNDCLOUD, toggleDropdownList: 'none' });
				this.props.passOption(searchOp.SOUNDCLOUD);
				break;
			case searchOp.YOUTUBE:
				this.setState({ currentIcon: faYoutube, id: searchOp.YOUTUBE, toggleDropdownList: 'none' });
				this.props.passOption(searchOp.YOUTUBE);
				break;
			case searchOp.ALLCLOUDS:
				this.setState({ currentIcon: faCompactDisc, id: searchOp.ALLCLOUDS, toggleDropdownList: 'none' });
				this.props.passOption(searchOp.ALLCLOUDS);
				break;	
		}
	}

	render () {
		return (
			<Dropdown>
				<Item id={this.state.id} onClick={this.handleSelectIcon.bind(this)} layout={this.props.layout}>
					<FontAwesomeIcon 
						icon={this.state.currentIcon} 
						size="1x" 
						fixedWidth
						onClick={this.handleSelectIcon.bind(this)}
					/>
				</Item>
				<DropdownList style={{display: this.state.toggleDropdownList}}>
					<Item id={searchOp.SPOTIFY} onClick={this.handleChooseIcon.bind(this)} layout={this.props.layout}>
						<FontAwesomeIcon 
							id={searchOp.SPOTIFY} 
							icon={faSpotify} 
							size="1x" 
							onClick={this.handleChooseIcon.bind(this)}
						/>
					</Item>
					<Item id={searchOp.SOUNDCLOUD} onClick={this.handleChooseIcon.bind(this)} layout={this.props.layout}>
						<FontAwesomeIcon 
							id={searchOp.SOUNDCLOUD} 
							icon={faSoundcloud} 
							size="1x" 
							onClick={this.handleChooseIcon.bind(this)}
						/>
					</Item>	
					<Item id={searchOp.YOUTUBE} onClick={this.handleChooseIcon.bind(this)} layout={this.props.layout}>
						<FontAwesomeIcon 
							id={searchOp.YOUTUBE} 
							icon={faYoutube} 
							size="1x" 
							onClick={this.handleChooseIcon.bind(this)}
						/>
					</Item>
					<Item id={searchOp.ALLCLOUDS} onClick={this.handleChooseIcon.bind(this)} layout={this.props.layout}>
						<FontAwesomeIcon 
							id={searchOp.ALLCLOUDS} 
							icon={faCompactDisc} 
							size="1x" 
							onClick={this.handleChooseIcon.bind(this)}
						/>
					</Item>
				</DropdownList>
			</Dropdown>
		)
	}
	
}

export default ItemDropdown;