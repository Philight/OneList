import React, { Component } from "react";
import styled from 'styled-components';


const animationUrl = require("../assets/images/pulseloading.svg");


const LoadingContainer = styled.div`
	background-color: rgb(43, 48, 49);
	width: 100%;
	height: 100vh;

	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	z-index: 2;
`

const LoadingPage = (props) => {
	return (
		<LoadingContainer>
			<img src={animationUrl} alt="Loading..."/>
		</LoadingContainer>
	)
}

export default LoadingPage;