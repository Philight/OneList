import React, { useRef, useEffect, useState } from "react";
import styled from 'styled-components';

const Container = styled.div`
	display: ${props => props.isShown ? 'flex' : 'none'};

	justify-content: center;
	align-items: center;
	flex-direction: column;

	max-width: 100%;

	margin: 10px;

	text-overflow: clip;
    white-space: nowrap;
    overflow: hidden;

	z-index: 1;

	//border: 1px solid red;
`

const TitleTemplate = styled.div`
	color: #cccccc;

	max-width: 100%;
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
//	top: ${props => props.parentTop - 20}px;

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

const Link = styled.a`
	&:link, :visited {
		text-decoration: none;
		color: #ccccff;
	}

	${props => (props.disableLink === "javascript:;") && "cursor: default;"}
`


const RecordData = (props) => {
	let { url, images, name, artists, album } = props;

	const [titleTop, setTitleTop] = useState(0);
	const [titleLeft, setTitleLeft]  = useState(0);

	const [subtitle1Top, setSubtitle1Top] = useState(0);
	const [subtitle1Left, setSubtitle1Left] = useState(0);

	const [subtitle2Top, setSubtitle2Top] = useState(0);
	const [subtitle2Left, setSubtitle2Left] = useState(0);

	const titleRef = useRef(null);
	const subtitle1Ref = useRef(null);
	const subtitle2Ref = useRef(null);

	const [tooltipTop, setTooltipTop]  = useState(0);
	const [tooltipLeft, setTooltipLeft]  = useState(0);

	const [tooltipST1Top, setTooltipST1Top]  = useState(0);
	const [tooltipST1Left, setTooltipST1Left]  = useState(0);

	const [tooltipST2Top, setTooltipST2Top]  = useState(0);
	const [tooltipST2Left, setTooltipST2Left]  = useState(0);

	const tooltipTRef = useRef(null);
	const tooltipST1Ref = useRef(null);
	const tooltipST2Ref = useRef(null);

	useEffect ( () => {
		if(titleRef.current) {
			setTitleTop(titleRef.current.offsetTop);
			setTitleLeft(titleRef.current.offsetLeft);
		}
		if(subtitle1Ref.current) {
			setSubtitle1Top(subtitle1Ref.current.offsetTop);	
			setSubtitle1Left(subtitle1Ref.current.offsetLeft);								
		}
		if(subtitle2Ref.current) {
			setSubtitle2Top(subtitle2Ref.current.offsetTop);	
			setSubtitle2Left(subtitle2Ref.current.offsetLeft);								
		}
		if(tooltipTRef.current) {
			setTooltipTop(tooltipTRef.current.offsetTop);
			setTooltipLeft(tooltipTRef.current.offsetLeft);									
		}
		if(tooltipST1Ref.current) {
			setTooltipST1Top(tooltipST1Ref.current.offsetTop);
			setTooltipST1Left(tooltipST1Ref.current.offsetLeft);									
		}
		if(tooltipST2Ref.current) {
			setTooltipST2Top(tooltipST2Ref.current.offsetTop);
			setTooltipST2Left(tooltipST2Ref.current.offsetLeft);									
		}
	}, [titleRef, subtitle1Ref, subtitle2Ref, tooltipTRef, tooltipST1Ref, tooltipST2Ref]); 

	const openNewTab = (url) => {
		if ( url !== "javascript:;") {
		// Open in new Tab
			return "_blank";
		}

		else {
			return "_self";
		}
	}

	const renderSubtitle1 = () => {
		if ( album ) {
			return (
				<Subtitle1 ref={subtitle1Ref}>
					<Link href={album.url} target={openNewTab(album.url)} disableLink={album.url}>{album.name}</Link>
					<TooltipSubtitle1 ref={tooltipST1Ref} parentTop={subtitle1Top}>{album.name}</TooltipSubtitle1>
				</Subtitle1>
			)
		} else if ( artists ) {
			return (
				<Subtitle1 ref={subtitle1Ref}> 
					<Link href={artists[0].url} target={openNewTab(artists[0].url)} disableLink={artists[0].url}>{artists[0].name}</Link>
					<TooltipSubtitle1 ref={tooltipST1Ref} parentTop={subtitle1Top}>{artists[0].name}</TooltipSubtitle1>
				</Subtitle1>
			)
		}
	}

	const renderSubtitle2 = () => {
		if ( album ) {
			return (
				<Subtitle2 ref={subtitle2Ref}>
					<Link href={artists[0].url} target={openNewTab(artists[0].url)} disableLink={artists[0].url}>{artists[0].name}</Link>
					<TooltipSubtitle2 ref={tooltipST2Ref} parentTop={subtitle2Top}>{artists[0].name}</TooltipSubtitle2>
				</Subtitle2>
			)
		}
	}

	return (
		<Container isShown={props.isShown}>
			<Title ref={titleRef}> 
				<Link href={url} target={openNewTab(url)} disableLink={url}>{name}</Link>
				<TooltipTitle ref={tooltipTRef} parentTop={titleTop}>{name}</TooltipTitle>
			</Title>
			{ renderSubtitle1() }
			{ renderSubtitle2() }
		</Container>
	)

}

export default RecordData;