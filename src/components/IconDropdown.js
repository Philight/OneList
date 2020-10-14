import React, { Component } from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import { faCompactDisc } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Dropdown = styled.div`
	margin-right: 0px;
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
		case "spotify":
			return "color: #08FF00; background-color: #000000";
		case "soundcloud":
			return "color: #FFFFFF; background-color: #FF3A00";
		case "all-cloud":
			return "color: #000000; background-color: #FFFFFF";
	}
}

const Item = styled.li`
	width: 100%;

    display:list-item;
    list-style: none;
    text-align: center;

    ${props => handleColor(props.id)};
 
    padding: 1px;
    font-size: 44px;

    line-height: 64px; /* fixed icon heights */
    height: 60px;
`

class ItemDropdown extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentIcon: faSpotify,
			toggleDropdownList: 'none',
			id: "spotify",
		}
	}

	handleSelectIcon(event) {
		this.setState({ toggleDropdownList: 'list-item' })
	}

	handleChooseIcon(event) {
		switch(event.target.id) {
			case "spotify":
				this.setState({ currentIcon: faSpotify, id: "spotify", toggleDropdownList: 'none' })
				break;
			case "soundcloud":
				this.setState({ currentIcon: faSoundcloud, id: "soundcloud", toggleDropdownList: 'none' })
				break;
			case "all-cloud":
				this.setState({ currentIcon: faCompactDisc, id: "all-cloud", toggleDropdownList: 'none' })
				break;	
		}
	}

	render () {
		return (
			<Dropdown>
				<Item id={this.state.id} onClick={this.handleSelectIcon.bind(this)}>
					<FontAwesomeIcon 
						icon={this.state.currentIcon} 
						size="1x" 
						fixedWidth
						onClick={this.handleSelectIcon.bind(this)}
					/>
				</Item>
				<DropdownList style={{display: this.state.toggleDropdownList}}>
					<Item id="spotify" onClick={this.handleChooseIcon.bind(this)}>
						<FontAwesomeIcon 
							id="spotify" 
							icon={faSpotify} 
							size="1x" 
							onClick={this.handleChooseIcon.bind(this)}
						/>
					</Item>
					<Item id="soundcloud" onClick={this.handleChooseIcon.bind(this)}>
						<FontAwesomeIcon 
							id="soundcloud" 
							icon={faSoundcloud} 
							size="1x" 
							onClick={this.handleChooseIcon.bind(this)}
						/>
					</Item>
					<Item id="all-cloud" onClick={this.handleChooseIcon.bind(this)}>
						<FontAwesomeIcon 
							id="all-cloud" 
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