import React, { Component } from "react";
import styled from 'styled-components';

import './ResultsRecord.css';

const titleStyle = {
	fontSize: '3.5vh',
	color: 'var(--tertiarycolor)'
}

const subtitleStyle = {
	textAlign: 'center',
	fontSize: '2.5vh',

	color: 'var(--tertiarycolor)'	
}

const Record = styled.div`
	margin: 1% 2%;
	width: 92%;
	
	background-color: ${props => ((props.primarycolor) ? 'var(--primarycolor)' : 'var(--secondarycolor)' )};
	border: 1px solid var(--tertiarycolor);

	flex: 0 0 21%;	

	display: flex;
	flex-direction: row;
	align-items: center;

`

const ImageSquare = styled.div`
	position: relative;
	
	border: 1px solid red;

	width: 30%;
	height: 0;	

	padding: 15% 0;
	margin: 4%;

/*
	&:after {
		content: "";
		height: 0;
		display: block;
		padding-bottom: 100%;
		border: 2px solid green;
	}
*/
`

const ResultsRecord = (props) => {
	return (
		<Record primarycolor={props.primarycolor}>
			<ImageSquare />
			<div>
				<label style={titleStyle}>{props.title}{props.numbering}</label>
				<br />
				<label style={subtitleStyle}>{props.subtitle}</label>				
			</div>
		</Record>
	)

}

export default ResultsRecord;