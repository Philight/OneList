import React, { Component } from "react";
import './LandingPage.css';

import SearchBar from './SearchBar';

const LandingPage = (props) => {
	return (
		<div className="landing-page">
			<label className="title">
				Every favourite song 
				<br />
				in one place
				<br />
			</label>
			<label className="subtitle">
				Tap below to create your own list.
			</label> 
			<div className="moveright"> <SearchBar /> </div>
		</div>
	)

}

export default LandingPage;