
import React, { Component } from "react";
import { withRouter } from 'react-router-dom';

import './SearchBar.css';
import IconDropdown from './IconDropdown';

import { VARIABLES } from '../data/ENV.js';
import { MUSIC_PLATFORMS } from '../data//MUSIC_PLATFORMS';

import callSpotifyAPI from './../utilities/spotify/callSpotifyAPI';
import callYoutubeAPI from './../utilities/youtube/callYoutubeAPI';
import callSoundcloudAPI from './../utilities/soundcloud/callSoundcloudAPI';
import callAllAPI from './../utilities/allclouds/callAllAPI';

import { SpotifyContext } from '../contexts/SpotifyContext';

class SearchBar extends Component {
	constructor(props) {
    	super(props);

    	this.state = {
    		inputValue: '',
    		searchSource: MUSIC_PLATFORMS.SPOTIFY,
    		resultsQuota: 10,	// number of results 
    		testObj: { }
    	}
    	this.submitForm = this.submitForm.bind(this);
  	}

  	handleInputChange (event) {
  		this.setState({ inputValue: event.target.value });
  	}

  	handleSearchSource(newOption) {
  		this.setState({ searchSource: newOption });
  	}

  	submitForm (e, updateArtist, updateAlbum, updateTrack, updateReadyState) {
	    e.preventDefault()
 		updateReadyState(false);
 		switch(this.state.searchSource) {

 			case MUSIC_PLATFORMS.SPOTIFY:
				//alert("Calling SpotifyAPI...");
				callSpotifyAPI(this.state.inputValue, this.state.resultsQuota)
					.then((searchObj) => {
						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
						updateReadyState(true);
					})
 				break;

 			case MUSIC_PLATFORMS.YOUTUBE:
 				//alert("Calling YoutubeAPI...");
				callYoutubeAPI(this.state.inputValue, this.state.resultsQuota)
					.then((searchObj) => {
						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
						updateReadyState(true);
					})
 				break;

 			case MUSIC_PLATFORMS.SOUNDCLOUD:
				callSoundcloudAPI(this.state.inputValue, this.state.resultsQuota)
					.then((searchObj) => {
						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
						updateReadyState(true);
					})
 				break;

 			case MUSIC_PLATFORMS.ALLCLOUDS:
				//alert("Calling All APIs...");
 				callAllAPI(this.state.inputValue, this.state.resultsQuota)
 					.then((searchObj) => {
 						updateArtist(searchObj.artist);
						updateAlbum(searchObj.album);
						updateTrack(searchObj.track);
						updateReadyState(true);
 					})
 				break;
 		}

		this.props.history.push('/results'); // <--- The page you want to redirect your user to.
	//	this.state.testObj = callSpotifyAPI(this.state.inputValue);
  	}

	render() {
		return (
			<SpotifyContext.Consumer>
				{ ({updateArtist, updateAlbum, updateTrack, updateReadyState }) => (	
	        		<form className="search-form" onSubmit={event => this.submitForm(event, updateArtist, updateAlbum, updateTrack, updateReadyState)}>
						<input type="submit" style={{visibility: 'hidden'}} /> 
						<input 
							type="text" 
							placeholder="Type a song title" 
							value={this.state.inputValue}
							onChange={this.handleInputChange.bind(this)}
						/> 
							
						<IconDropdown
							passSource={this.handleSearchSource.bind(this)}
							layout={this.props.layout}
						/>
					</form>
      			)}
			</SpotifyContext.Consumer>
		)
	}

}

export default withRouter(SearchBar);