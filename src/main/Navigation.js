import React from "react";
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import SearchBar from '../components/SearchBar';

const layoutTheme = (layout) => {
	switch(layout) {
		case "LayoutLanding":
			return `
				background-color: transparent;
				border-bottom: none;
			`
		case "LayoutResults":
			return `
				background-color: rgb(var(--primarycolor));
				border-bottom: 2px solid rgb(var(--secondarycolor));
			`
		case "LayoutPlaylist":
			return `
				background-color: transparent;
			`
	}
}


const NavBar = styled.ul`
	list-style-type: none;
	padding: 0;
	margin: 0;
	width: 100%;
	border-radius: 2px;

	${props => (layoutTheme(props.layout))};

	color: white;

	position: fixed;
	top: 0px;
	z-index: 2;
`

const NavElem = styled.li`
	display: inline;
	font-size: 26px;
	font-family: 'FugazOne';

	margin: 0;
	padding: 0 1vw;
	margin-left: ;

	line-height: 10vh; /* center text vertically */
	height: 10vh;   /* centering content vertically */

	float: left;
	&:last-child {
    	float: right;
    	margin-right: ;
    }
`

const linkStyling = {
	color: '#FFF',
	textDecoration: 'none',
	margin: '0',
	padding: '0',
};

const Navigation = (props) => {

	switch(props.layout) {
		case "LayoutLanding":
		case "LayoutResults":
			return (
				<NavBar layout={props.layout}>
					<NavElem><Link to="/" style={linkStyling}>one.list</Link></NavElem>
					<NavElem>{(props.layout === "LayoutResults") && <SearchBar />}</NavElem>
				</NavBar>
			);
		case "LayoutPlaylist":
			return (
				<NavBar layout={props.layout}>
					<NavElem>{<Link to="/" style={linkStyling}>+ New List</Link>}</NavElem>
				</NavBar>
			);
	};
}

export default Navigation;