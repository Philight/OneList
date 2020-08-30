import React, { Component } from "react";

import './SearchBar.css';

const SearchBar = (props) => {
	return (
		<div className="flex-wrapper">
			<div className="search-bar">
				Every favorite song 
				<br />
				in one place. 
				<br />
				<label className="subtitle">Tap below to create your own list.</label> 
				<br />
				<input type="text" placeholder="Type a song title" />
			</div>
		</div>
	)

}

export default SearchBar;