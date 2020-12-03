import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';

const Input = styled.input`
	outline: none;
	border: none;
	padding: 0;

	font-family: "Times New Roman";
	font-size: 11px;
	width: ${props => props.minWidth}px;
 	min-width: ${props => props.minWidth}px;

	width: ${props => props.autoWidth};

	${props => props.inputCSS};
`

const MeasureElement = styled.span`
	visibility: hidden;

	border: 1px solid red; 
	position: absolute;
	font-size: 11px;
	font-family: "Times New Roman";

	${props => props.inputCSS};
`

const Wrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-start;

	border-bottom: 3px solid black;
	transition: width 0.7s ease-in-out;

 	min-width: ${props => props.minWidth}px;

	${props => props.wrapperCSS};
	${props => props.autoWidth};
`

const AutosizeInputUnderline = (props) => {
	const inputRef = useRef(null);
	const measureRef = useRef(null);

	const [inputValue, setInputValue] = useState(null);
	const [wrapperWidthValue, setWrapperWidthValue] = useState(`width: ${props.minWidth}px`);

	const [inputWidth, setInputWidth] = useState("");

	useEffect(() => {
		if ((inputRef.current.scrollWidth) <= (props.maxWidth)) {
			setInputWidth(measureRef.current.getBoundingClientRect().width+9 +'px');
		} else {
			setInputWidth(props.maxWidth +'px');
		}

	}, [inputValue]);

	const onFocus = {
		css: `
			width: ${props.maxWidth}px;
	   		border-width: 4px;

	   		${props.onFocusCSS};
		`,
		css2:`
			width: auto;
		`

	}
	const handleInputFocus = (event) => {
		//alert("input focused");
		setWrapperWidthValue(onFocus.css);
	}

	const handleInputBlur = (event) => {
		//alert("input blurred");

		setWrapperWidthValue(`width: ${inputWidth}`);
		//setWrapperWidthValue(onFocus.css2);
	}

	const updateValue = (event) => {
		setInputValue(event.target.value);
	} 

	return (
		<Wrapper
			autoWidth={wrapperWidthValue}
			wrapperCSS={props.wrapperCSS}
			minWidth={props.minWidth}
		>
			<Input
				ref={inputRef}
				placeholder={props.placeholder}
				value={props.inputValue}
				minWidth={props.minWidth}
				autoWidth={inputWidth}
				inputCSS={props.inputCSS}
				onChange={(e) => { props.onChange(e); updateValue(e) }}
				onFocus={handleInputFocus}
				onBlur={handleInputBlur}
			/>
			<MeasureElement
				ref={measureRef}
				inputCSS={props.inputCSS}
			>
				{inputValue}
			</MeasureElement>
		</Wrapper>


	)
}

export default AutosizeInputUnderline;