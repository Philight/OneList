import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './SearchBar.css';
import IconDropdown from './IconDropdown';

class SearchBar extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		inputValue: '', 
    	}
  	}

  	submitForm (e) {
	    e.preventDefault()
	    this.props.history.push('/results'); // <--- The page you want to redirect your user to.
  	}

	render() {
		return (
			<form className="search-form" onSubmit={this.submitForm.bind(this)}>
				
				<input type="submit" style={{visibility: 'hidden'}} /> 
				<input 
					type="text" 
					placeholder="Type a song title" 
					value={this.state.inputValue}
				/> 
					
				<IconDropdown />
			</form>
		)
	}

}

export default withRouter(SearchBar);