import React, { Component } from "react";
import styled from 'styled-components';

import { faSpotify, faSoundcloud } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Dropdown = styled.div`

`

const DropdownList = styled.ul`
	list-style: none; 
	border: 1px solid red;

	margin: 0;
	padding: 0;

	display: none;
	position: relative;
	top: 50px;

    ${Dropdown}:hover & {
		display: list-item;
		position: absolute;
	}
`

const Item = styled.li`
	border: 1px solid green;
	width: 100%;

    display:list-item;
    list-style: none;
    float: left;

    background-color: #64abfb;
    color: yellow;

`

const ItemDropdown = (props) => {
	return (
		<Dropdown>
			<Item><FontAwesomeIcon icon={faSpotify} /></Item>
			<DropdownList>
				<Item><FontAwesomeIcon icon={faSpotify} /></Item>
				<Item><FontAwesomeIcon icon={faSoundcloud} /></Item>
			</DropdownList>
		</Dropdown>
	)	
}

export default ItemDropdown;