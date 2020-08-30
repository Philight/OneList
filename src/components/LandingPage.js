import React, { Component } from "react";
import './LandingPage.css';

import NavBar from './NavBar';
import SearchBar from './SearchBar';

const LandingPage = (props) => {
	return (
		<div className="landing-page">
			<div className="background"></div>
			<NavBar />
			<SearchBar />

		</div>
	)

}

export default LandingPage;