import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './SearchBar.css';
import IconDropdown from './IconDropdown';

class SearchBar extends Component {
	constructor(props) {
    	super(props);
  	}

  	submitForm (e) {
	    e.preventDefault()
	    this.props.history.push('/results'); // <--- The page you want to redirect your user to.
  	}

	render() {
		return (
			<form name="search-form" onSubmit={this.submitForm.bind(this)}>
				<input type="submit" style={{visibility: 'hidden'}} /> 
				<div className="onerow">
					<input type="text" placeholder="Type a song title" /> 
					<IconDropdown />
				</div>
			</form>
		)
	}

}

export default withRouter(SearchBar);