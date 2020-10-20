import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './SearchBar.css';
import IconDropdown from './IconDropdown';
import { searchOp } from './IconDropdown';

import callSpotifyAPI from './../utilities/spotify/callSpotifyAPI';
import callYoutubeAPI from './../utilities/youtube/callYoutubeAPI';
import callAllAPI from './../utilities/allclouds/callAllAPI';

import { SpotifyContext } from './SpotifyContext';

class SearchBar extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		inputValue: '',
    		searchOption: searchOp.SPOTIFY, 
    		testObj: { }
    	}
    	this.submitForm = this.submitForm.bind(this);
  	}

  	handleInputChange (event) {
  		this.setState({ inputValue: event.target.value });
  	}

  	handleSearchOption(newOption) {
  		this.setState({ searchOption: newOption });
  		alert("new option: "+newOption);
  	}

  	submitForm (e, updateArtist, updateAlbum, updateTrack) {
	    e.preventDefault()
 		
 		switch(this.state.searchOption) {
 			case searchOp.SPOTIFY:
				alert("Calling SpotifyAPI...");
				callSpotifyAPI(this.state.inputValue)
					.then((searchObj) => {
						alert(searchObj.artist);
						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
					})
 				break;

 			case searchOp.YOUTUBE:
 				alert("Calling YoutubeAPI...");
				callYoutubeAPI(this.state.inputValue)
					.then((searchObj) => {
						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
					})
 				break;

 			case searchOp.ALLCLOUDS:
				alert("Calling All APIs...");
 				callAllAPI(this.state.inputValue)
 					.then((searchObj) => {
 						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
 					})
 				break;
 		}

		this.props.history.push('/results'); // <--- The page you want to redirect your user to.
	//	this.state.testObj = callSpotifyAPI(this.state.inputValue);
  	}

	render() {
		return (
			<SpotifyContext.Consumer>
				{ ({updateArtist, updateAlbum, updateTrack}) => (
					<div>
	        		<form className="search-form" onSubmit={event => this.submitForm(event, updateArtist, updateAlbum, updateTrack)}>
						<input type="submit" style={{visibility: 'hidden'}} /> 
						<input 
							type="text" 
							placeholder="Type a song title" 
							value={this.state.inputValue}
							onChange={this.handleInputChange.bind(this)}
						/> 
							
						<IconDropdown
							passOption={this.handleSearchOption.bind(this)}
							layout={this.props.layout}
						/>
						
					</form>
{/*
						<a
				            href={`data:text/json;charset=utf-8,${encodeURIComponent(
				              JSON.stringify(this.state.testObj)
				            )}`}
				            download="testobject.json"
				          >
				            {`Download Json`}
				        </a>
*/}
				    </div>
      			)}
			</SpotifyContext.Consumer>
		)
	}

}

export default withRouter(SearchBar);