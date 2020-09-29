import React, { Component } from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from './SearchBar';

const NavBar = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100vw;

	background-color: ${props => ((props.layout == "LayoutOther") ? 'var(--primarycolor)' : 'transparent')};
	border-bottom: ${props => ((props.layout == "LayoutOther") ? '1px solid var(--secondarycolor)' : 'none')};
	
	color: white;

	position: fixed;
	top: 0;
	z-index: 1;
`

const NavElem = styled.li`
	display: inline;
	font-size: 26px;
	font-family: 'FugazOne';

	margin: 0;
	padding: 0 15px;
	line-height: 80px;
	height: 80px;   /* centering content vertically */

	float: left;
	&:last-child {
    	float: right;
    	margin-right: 20px;
    }
`

const linkStyling = {
	color: '#FFF',
	textDecoration: 'none',
	margin: '0',
	padding: '0',
};

const Navigation = (props) => {
	return (
		<NavBar layout={props.layout}>
			<NavElem><Link to="/" style={linkStyling}>OneList</Link></NavElem>
			<NavElem><Link to="/results" style={linkStyling}>Results</Link></NavElem>
			<NavElem>{(props.layout == "LayoutOther") && <SearchBar />}</NavElem>
		</NavBar>
	)
}

export default Navigation;