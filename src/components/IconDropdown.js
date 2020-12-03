import React, { Component } from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const searchSrc = {
	SPOTIFY: 'spotify',
	SOUNDCLOUD: 'soundcloud',
	YOUTUBE: 'youtube',
	ALLCLOUDS: 'allclouds'
}

const musicClouds = [
	{ id: searchSrc.SPOTIFY, icon: faSpotify },
	{ id: searchSrc.YOUTUBE, icon: faYoutube },
	{ id: searchSrc.SOUNDCLOUD, icon: faSoundcloud },
	{ id: searchSrc.ALLCLOUDS, icon: faCompactDisc },
]

const Dropdown = styled.div`
	position: relative;

	//border: 1px red solid;
`

const DropdownList = styled.ul`
	list-style: none; 

	margin: 0;
	padding: 0;

	display: ${props => props.display};
	top: 0px;
	position: absolute;

`
{/* ${Dropdown}:hover & {
		display: list-item;
	}
*/}
    
const handleColor = source => {
	switch(source) {
		case searchSrc.SPOTIFY:
			return "color: #1DB954; background-color: #000000;";
		case searchSrc.SOUNDCLOUD:
			return "color: #FFFFFF; background-color: #FF3A00;";
		case searchSrc.YOUTUBE:
			return "color: #FF0000; background-color: #FFFFFF;";
		case searchSrc.ALLCLOUDS:
			return "color: #000000; background-color: #FFFFFF;";
		default:
			return;
	}
}

/* Icon positioning, blend based on layout */
const handleLayout = (layout) => {
	if (layout === 'LayoutLanding') {
		return `line-height: 40px;
				height: 40px; 
				mix-blend-mode: screen;`
	} else {
	// LayoutOther
		return `line-height: 45px; 
				height: 40px; 
				mix-blend-mode: normal;`
	}
}

const ItemPlaceholder = styled.li`
	width: 45px;

    display: ${props => props.show ? 'list-item' : 'list-item'};
    list-style: none;
    text-align: center;

    ${props => props.show 
    	? handleColor(props.id) 
    	: "color: transparent; background-color: transparent; border: 4px solid transparent;"}
 	${props => handleLayout(props.layout)};

    padding: 0px;
    font-size: 30px;
    border-radius: 50%;//
    border: 4px solid rgba(var(--silvercolor2), 1);

    
`

const Item = styled(ItemPlaceholder)`
	display: list-item;

	${props => handleColor(props.id)};
`

class ItemDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIcon: faSpotify,
			toggleDropdownList: 'none',
			showCurrentIcon: true,
			id: searchSrc.SPOTIFY,
		}
	}

	handleSelectIcon(event) {
		this.setState({ toggleDropdownList: 'list-item', showCurrentIcon: false });
	}

	handleChooseIcon(event) {
		switch(event.target.id) {
			case searchSrc.SPOTIFY:
				this.setState({ currentIcon: faSpotify, id: searchSrc.SPOTIFY, toggleDropdownList: 'none', showCurrentIcon: true });
				this.props.passSource(searchSrc.SPOTIFY);
				break;
			case searchSrc.SOUNDCLOUD:
				this.setState({ currentIcon: faSoundcloud, id: searchSrc.SOUNDCLOUD, toggleDropdownList: 'none', showCurrentIcon: true });
				this.props.passSource(searchSrc.SOUNDCLOUD);
				break;
			case searchSrc.YOUTUBE:
				this.setState({ currentIcon: faYoutube, id: searchSrc.YOUTUBE, toggleDropdownList: 'none', showCurrentIcon: true });
				this.props.passSource(searchSrc.YOUTUBE);
				break;
			case searchSrc.ALLCLOUDS:
				this.setState({ currentIcon: faCompactDisc, id: searchSrc.ALLCLOUDS, toggleDropdownList: 'none', showCurrentIcon: true });
				this.props.passSource(searchSrc.ALLCLOUDS);
				break;	
		}
	}

	render () {
		return (
			<Dropdown>
				<ItemPlaceholder 
					id={this.state.id} 
					onClick={this.handleSelectIcon.bind(this)} 
					layout={this.props.layout}
					show={this.state.showCurrentIcon}
				>
					<FontAwesomeIcon 
						id={this.state.id} 
						icon={this.state.currentIcon} 
						fixedWidth
						onClick={this.handleSelectIcon.bind(this)}
					/>
				</ItemPlaceholder>
				
				<DropdownList display={this.state.toggleDropdownList}>
					{ musicClouds.map(cloud => 
						<Item id={cloud.id} onClick={this.handleChooseIcon.bind(this)} layout={this.props.layout}>
							<FontAwesomeIcon 
								id={cloud.id}
								icon={cloud.icon}
								onClick={this.handleChooseIcon.bind(this)}
							/>
						</Item>
					) }			
				</DropdownList>
			</Dropdown>
		)
	}
	
}

export default ItemDropdown;