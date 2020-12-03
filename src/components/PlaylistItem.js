import React, { useState } from "react";
import styled from 'styled-components';

import CloudIcon from './CloudIcon';

const themeContainer = (index, isSelected) => {
	if (isSelected) {
		return `
			border: 6px solid rgba(var(--tertiarycolor), 0.6);
			background-color: rgba(var(--tertiarycolor), 0.6);
			color: white;
		`
	}

	switch((index+1) % 2) {
		case 1:
			return `
				border: 6px solid rgba(var(--primarycolor), 0.6);
				background-color: rgba(var(--primarycolor), 0.8);
				color: rgba(255,255,255, 0.6);
			`	
		case 0:
			return `
				border: 6px solid rgba(255,255,255, 0.1);
				background-color: rgba(255,255,255, 0.4);
				color: rgb(var(--primarycolor));
				font-weight: bold;
			`
	
		case 2:
			return `
				border: 6px solid rgba(var(--secondarycolor), 0.6);
				background-color: rgba(var(--secondarycolor), 0.8);
			`
		case 3:
			return `
				border: 6px solid rgba(var(--tertiarycolor), 0.6);
				background-color: rgba(var(--tertiarycolor), 0.6);
				color: white;
			`
	}
}

const themeCircle = (index, isSelected, innerElement) => {
	if (innerElement === "dot") {
		if (isSelected) {
			return `
				background-color: white;
			`
		}

		switch((index+1) % 2) {
			case 1:
				return `
					background-color: rgba(255,255,255, 0.6);
				`
			case 0:
				return `
					background-color: rgb(var(--primarycolor));
				`
		}
	} else if (innerElement === "hoverText") {
		if (isSelected) {
			return `
				color: rgba(var(--tertiarycolor));
			`
		}
		switch((index+1) % 2) {
			case 1:
				return `
					color: rgb(var(--primarycolor));
				`
			case 0:
				return `
					color: rgba(255,255,255, 0.6);
				`
		}
	}	

}


const ItemContainer = styled.div`
	transition: 0.2s all ease-out;

	width: 100%;
	height: 10vh;

	//padding: 0 32px;

	display: flex;
	align-items: center;
	justify-content: space-between;

	border-radius: 5%/45%;

	font-size: 20px;

	cursor: pointer;

	${props => themeContainer(props.index, props.isSelected)};
`

const cloudIconStyle = {
	css: `
		//color: rgb(var(--tertiarycolor));
		margin-left: 6px;
		font-size: 32px;
	`,
}

const Circle = styled.div`
	//border: 1px solid red;
	border-radius: 45%/45%;

	margin-right: 10px;
	padding: 0px 14px;
	font-size: 36px;

	//width: 40px;
	//height: 40px;
	//line-height: 36px;
	text-align: center;

	position: relative;
	z-index: 1;

	&:hover {
		${props => themeCircle(props.index, props.isSelected, "hoverText")};

	}

	::after {
		content: "";
		z-index: -1;

		${props => themeCircle(props.index, props.isSelected, "dot")};

		border-radius: 45%/45%;
		width: 8px;
		height: 8px;

		position: absolute;
		top: 32px;
		right: 1px;
		transition: 0.1s all ease-in;
	}

	&:hover::after {
		transform: scale(6);
		transform-origin: 7.5px 6px;
	}

`

const Margins = styled.div`
	margin: 28px;

	display: flex;
`

const FlexStart = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	overflow: hidden;
	white-space: nowrap;
`

const PlaylistItem = (props) => {
	let { index, track, setSelectedIndex, setCurrentSelection } = props;

	const [isSelected, setIsSelected] = useState(false);
	// true

	const selectTrack = (setSelectedIndex) => {
		if (!isSelected) {
			setSelectedIndex(index+1, track.images.url);
			setIsSelected(true);
			setCurrentSelection(setIsSelected);

		} else if (isSelected) {
			setSelectedIndex(0, "");
			setIsSelected(false);
		}

	}

	const handleIconStyling = () => {
		if (!isSelected) {
			return cloudIconStyle.css + "; color: rgb(var(--tertiarycolor));";
		}
		return cloudIconStyle.css;
	}


	return (
		<ItemContainer 
			index={index} 
			isSelected={isSelected}
			onClick={() => selectTrack(setSelectedIndex)}
		>
			<FlexStart>
				<Margins>
					<Circle index={index} isSelected={isSelected}> {index+1} </Circle>
					<CloudIcon 
						url={track.url} 
						source={track.source} 
						hover={!isSelected}
						styleCSS={handleIconStyling()} 
					/>
				</Margins>
				{track.artists[0].name} - {track.name}
			</FlexStart>
			<Margins>04:34</Margins>
		</ItemContainer>
	)

}

export default PlaylistItem;