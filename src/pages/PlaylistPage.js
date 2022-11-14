import React, { Component } from "react";
import styled from 'styled-components';

import PlaylistItem from '../components/PlaylistItem';
import LoadingPage from './LoadingPage';

const PlaylistContainer = styled.div`
	width: 50%;
	margin: 0 25%;

	position: relative;
	top: calc(10vh + 1px);

	//border: 1px solid blue;

	display:flex;
	flex-direction: column;
	align-items: center;
`

const PlaylistTitle = styled.span`
	margin-top: 36px;

	color: white;
	font-size: 48px;
	font-family: 'Alegreya';

	margin-bottom: 36px;
`

const FlexContainer = styled.div`

	width: 100%;

	display: flex;
	flex-direction: column;
	align-items: center;

	gap: 10px;
`

class PlaylistPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: true,
			error: null,
			playlist: null,
			selectedTrack: 0,
			deselectPrevious: null,
			containerHeight: 0,

		}
		this.containerRef = React.createRef();
		this.setSelectedIndex = this.setSelectedIndex.bind(this);
	}

	componentWillMount() {
		this.setState({ isLoading: true });
		this.props.updateLoading(true);

		const playlistId = this.props.match.params.playlistId; // useParams() 84f86b4ffb1443669990
		fetch("/database/?" + new URLSearchParams({
		    playlistId: playlistId,
		}))
			.then((response) => { 
				if (response.ok) {
					//alert("response ok");
					return response.json();
				} 
				throw response;
			})
			.then(object => {
				this.setState({ playlist: object, isLoading: false });
				this.props.updateLoading(false);

			})
			.catch(error => error.text().then(errorMsg => {
				alert(errorMsg);
				this.props.updateLoading(true);
				this.setState({ isLoading: true, error: errorMsg })
			}));

	}

	componentDidMount() {
		//this.setState({ containerHeight: this.containerRef.current.scrollHeight })
		//alert("Component mount, containerheight: "+this.state.containerHeight);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.containerHeight !== this.state.containerHeight) {
			this.setState({ containerHeight: this.containerRef.current.scrollHeight });
			this.props.updateOverlay(this.containerRef.current.scrollHeight);
			//alert("Component mount, containerheight: "+this.state.containerHeight);
		}
		
		if (prevState.selectedTrack == 0) {
			return;
		} else if (prevState.selectedTrack !== this.state.selectedTrack) {
    		prevState.deselectPrevious(false);
  		}
	}

	setSelectedIndex(index, imageUrl) {
		this.setState({ selectedTrack: index });
		this.props.updateBkg(this.state.selectedTrack, imageUrl);
	}

	setCurrentSelection(selectionCallback) {
		this.setState({ deselectPrevious: selectionCallback})
	}

	render(){
		if (this.state.error) {
			return <div>Error: {this.state.error}</div>;
		} else if (this.state.isLoading) {  
		    return <LoadingPage />;
		} else {
		//const playlist = this.context;
			return (
				<PlaylistContainer ref={this.containerRef}>
					<PlaylistTitle>{this.state.playlist.title}</PlaylistTitle>
					<FlexContainer>
						{this.state.selectedTrack}
						{ this.state.playlist.playlistArr.map((track, index) => 
							<PlaylistItem 
								index={index} 
								track={track} 
								setSelectedIndex={this.setSelectedIndex}
								setCurrentSelection={this.setCurrentSelection.bind(this)}
							/>
						) }
					</FlexContainer>
				</PlaylistContainer>
			)
		}
	}
}

export default PlaylistPage;