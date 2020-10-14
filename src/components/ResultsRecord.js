import React, { Component, useRef, useEffect, useState } from "react";
import styled, { keyframes } from 'styled-components';

const imageUrl = require("./../images/spotifysquare.jpg");

const subtitleStyle = {
	textAlign: 'center',
	fontSize: '2.5vh',

	color: 'var(--tertiarycolor)'	
}

const Record = styled.div`
	margin-bottom: 1.3vh;
	width: 92%;
	
	background-color: ${props => ((props.primarycolor) ? 'var(--primarycolor)' : 'var(--secondarycolor)' )};
	border: 0.1vh solid var(--tertiarycolor);

	flex: 0 0 9%;	

	display: flex;
	flex-direction: row;
	align-items: center;
`

const ImageSquare = styled.div`
	border: 2px solid black;

	width: 20%;
	height: 0;	

	padding: 10% 0;
	margin: 4%;

	background-image: url(${props => props.testMode ? imageUrl : props.image}); 
	background-size: cover;
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

const tableStyle = {
	display: 'table',
	tableLayout: 'fixed',
	
	width: '60%'
}

const rowStyle = {
	display: 'table-row',
	width: '100%',
	position: 'relative'

}


const slider = keyframes`
  from {
    margin-left: 100%;
    width: 300%; 
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
`

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const TitleTemplate = styled.div`
	color: var(--tertiarycolor);
	display: table-cell;

    text-overflow: clip;
    white-space: nowrap;
    overflow: hidden; 	
/*
	&:hover::before {
		display: none;
		content: "${props => props.text}";
		position: absolute;
		bottom: -30px;
    	padding: 10px;
    	background: #000;
    	color: #fff;
    	font-size: 14px;
    	white-space: nowrap;
		
	}
*/
}
`

const Title = styled(TitleTemplate)`
   	font-size: 3.5vh;
	font-weight: bold;

	padding-bottom: 0.5vh;
   	position: static; 
`

const Subtitle1 = styled(TitleTemplate)`
	font-size: 2.5vh;
	font-weight: normal;
`

const Subtitle2 = styled(TitleTemplate)`
	font-size: 2.5vh;
	font-weight: normal;
	font-style: italic;
`

const TooltipTemplate = styled.div`
	position: absolute;
	display: none;
	z-index: 20;
	top: ${props => props.parentTop};

	padding: 5px;
	background: #000;
	color: #fff;
	font-size: 14px;
	white-space: nowrap;
`

const TooltipTitle = styled(TooltipTemplate)`
	${Title}:hover & {
		display: block;
	}
`

const TooltipSubtitle1 = styled(TooltipTemplate)`
	${Subtitle1}:hover & {
		display: block;
	}
`

const TooltipSubtitle2 = styled(TooltipTemplate)`
	${Subtitle2}:hover & {
		display: block;
	}
`

const ImageFill = styled.img`
	min-width: 100%;
	min-height: 100%;

	width: 100px;
	height: 100px;
`

const Link = styled.a`
	&:link {
		text-decoration: none;
		color: var(--tertiarycolor);
	}

	&:visited {
		color: yellow;
	}
`

const ResultsRecord = (props) => {
	let { url, images, name, artists, album, testMode } = props;

	const [titleTop, setTitleTop] = useState(0);
	const [subtitle1Top, setSubtitle1Top] = useState(0);
	const [subtitle2Top, setSubtitle2Top] = useState(0);

	const titleRef = useRef(null);
	const subtitle1Ref = useRef(null);
	const subtitle2Ref = useRef(null);

	const [titleLeft, setTitleLeft]  = useState(0);

	const [tooltipTop, setTooltipTop]  = useState(0);
	const [tooltipLeft, setTooltipLeft]  = useState(0);
	const tooltipTRef = useRef(null);

	useEffect ( () => {
		if(titleRef.current) {
			setTitleTop(titleRef.current.offsetTop);
			setTitleLeft(titleRef.current.offsetLeft);
		}
		if(tooltipTRef.current) {
			setTooltipTop(tooltipTRef.current.offsetTop);
			setTooltipLeft(tooltipTRef.current.offsetLeft);									
		}
		if(subtitle1Ref.current) {
			setSubtitle1Top(subtitle1Ref.current.offsetTop);									
		}
		if(subtitle2Ref.current) {
			setSubtitle2Top(subtitle2Ref.current.offsetTop);									
		}
	}, [titleRef, tooltipTRef, subtitle1Ref, subtitle2Ref]); 

	const renderText = () => {
		// TEST MODE
		if ( testMode ) {
			if ( testMode === "track" ) {
				return (
					<div style={tableStyle}>
{/*
						<div>Title-T: {titleTop}</div>
						<div>Title-L: {titleLeft}</div>
						<div>Tooltip-T: {tooltipTop}</div>
						<div>Tooltip-L: {tooltipLeft}</div>
*/}
						<div style={rowStyle}>
							<Title ref={titleRef}>Tesssssssssssssssssssssssssssst
							<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>Tesssssssssssssssssssssssssssst</TooltipTitle>
							</Title>
						</div>
						<div style={rowStyle}>
							<Subtitle1 ref={subtitle1Ref}>Testoration of Pompous Equality
								<TooltipSubtitle1 parentTop={subtitle1Top}>Testtoration of Pompous Equality</TooltipSubtitle1>
							</Subtitle1>
						</div>
						<div style={rowStyle}>
							<Subtitle2 ref={subtitle2Ref}>TEST
								<TooltipSubtitle2 parentTop={subtitle2Top}>TEST</TooltipSubtitle2>
							</Subtitle2>
						</div>
					</div> 	
				)
			} else if ( testMode === "album" ) {
				return (
					<div style={tableStyle}>
						<div style={rowStyle}>
							<Title ref={titleRef}>Tesssssssssssssssssssssssssssst
								<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>Tesssssssssssssssssssssssssssst</TooltipTitle>
							</Title>
						</div>
						<div style={rowStyle}>
							<Subtitle1 ref={subtitle1Ref}>Testoration of Pompous Equality
								<TooltipSubtitle1 parentTop={subtitle1Top}>Testoration of Pompous Equality</TooltipSubtitle1>
							</Subtitle1>
						</div>
					</div>
				)
			} else {
				return (
					<div>
						<Title ref={titleRef}>TEST{props.numbering}
							<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>TEST</TooltipTitle>
						</Title>
					</div>
				)
			}
		} 

		if ( album ) {
		// TRACK
			return (
			<div style={tableStyle}>
				<div style={rowStyle}>
					<Title ref={titleRef}><Link href={url}>{name}</Link>
						<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>{name}</TooltipTitle>
					</Title>
				</div>
				<div style={rowStyle}>
					<Subtitle1 ref={subtitle1Ref}><Link href={album.url}>{album.name}</Link>
						<TooltipSubtitle1 parentTop={subtitle1Top}>{album.name}</TooltipSubtitle1>
					</Subtitle1>
				</div>
				<div style={rowStyle}>
					<Subtitle2 ref={subtitle2Ref}><Link href={artists[0].url}>{artists[0].name}</Link>
						<TooltipSubtitle2 parentTop={subtitle2Top}>{artists[0].name}</TooltipSubtitle2>
					</Subtitle2>
				</div>				
			</div>
			)
		
		
		} else if ( artists ) {
		// ALBUMS
			return (
			<div style={tableStyle}>
				<div style={rowStyle}>
					<Title ref={titleRef}> <Link href={url}>{name}</Link>
						<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>{name}</TooltipTitle>
					</Title>
				</div>
				<div style={rowStyle}>
					<Subtitle1 ref={subtitle1Ref}> <Link href={artists[0].url}>{artists[0].name}</Link>
						<TooltipSubtitle1 parentTop={subtitle1Top}>{artists[0].name}</TooltipSubtitle1>
					</Subtitle1>
				</div>
			</div>
			)
		} else {
		// ARTISTS
			return (
				<Title ref={titleRef}> <Link href={url}>{name}</Link>
					<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>{name}</TooltipTitle>
				</Title>
			)
		}
	}
	return (
		<Record primarycolor={props.primarycolor}>
			{ (images) ? <ImageSquare image={images[2].url} testMode={props.testMode} /> : <ImageSquare testMode={props.testMode} /> }
			{ renderText() }			
		</Record>
	)

}

export default ResultsRecord;