import React, { Component } from "react";
import styled from 'styled-components';

import { ReactComponent as IPulseLoading } from "../assets/images/loaders/pulseloading.svg";
const animationUrl = require("../assets/images/loaders/pulseloading.svg");


const SLoadingContainer = styled.div`
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
		<SLoadingContainer>
			<IPulseLoading />
		</SLoadingContainer>
	)
}

export default LoadingPage;