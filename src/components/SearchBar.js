import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './SearchBar.css';
import IconDropdown from './IconDropdown';
import callSpotifyAPI from './../utilities/callSpotifyAPI';

import { SpotifyContext } from './SpotifyContext';

class SearchBar extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		inputValue: '', 
    		testObj: { }
    	}
    	this.submitForm = this.submitForm.bind(this);
  	}

  	handleInputChange (event) {
  		this.setState({ inputValue: event.target.value });
  	}

  	submitForm (e, updateArtist, updateAlbum, updateTrack) {
	    e.preventDefault()
	    this.props.history.push('/results'); // <--- The page you want to redirect your user to.
 
		callSpotifyAPI(this.state.inputValue)
			.then((searchObj) => {
				//alert(searchObj.artist);
				updateArtist(searchObj.artist);
				updateAlbum(searchObj.album);
				updateTrack(searchObj.track);
			})
		this.state.testObj = callSpotifyAPI(this.state.inputValue);
  	}

	render() {
		return (
			<SpotifyContext.Consumer>
				{ ({updateArtist, updateAlbum, updateTrack}) => (
	        		<form className="search-form" onSubmit={event => this.submitForm(event, updateArtist, updateAlbum, updateTrack)}>
						<input type="submit" style={{visibility: 'hidden'}} /> 
						<input 
							type="text" 
							placeholder="Type a song title" 
							value={this.state.inputValue}
							onChange={this.handleInputChange.bind(this)}
						/> 
							
						<IconDropdown />
					</form>
      			)}
			</SpotifyContext.Consumer>
		)
	}

}

export default withRouter(SearchBar);