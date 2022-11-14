import React, { Component } from "react";
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import ResultsPage from './pages/ResultsPage';
import PlaylistPage from './pages/PlaylistPage';
import LoadingPage from './pages/LoadingPage';

import { LayoutLanding } from './layouts/LayoutLanding';
import { LayoutOther } from './layouts/LayoutOther';
import { LayoutPlaylist } from './layouts/LayoutPlaylist';

import { SpotifyContext } from './contexts/SpotifyContext';
import { PlaylistProvider } from './contexts/PlaylistContext';

const URL_BASENAME = '/one-list';

function App() {
  const [accessToken, setAccessToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState();

  // [ {source:searchSrc, url:string, images:{}, name:string},.. ] 
  const [artists, setArtists] = React.useState( [{ }] );
  // [ {source:searchSrc, url:string, images:{}, name:string, artists:[]},.. ]
  const [albums, setAlbums] = React.useState( [{ }] );
  // [ {source:searchSrc, url:string, images:{}, name:string, artists:[], album:{}},.. ]
  const [tracks, setTracks] = React.useState( [{ }] );

  const [readyState, setReadyState] = React.useState(true);


  const updateToken = (newTokenObj) => {
    setAccessToken( newTokenObj );
  };

  const updateArtist = (newArray) => {
    setArtists( newArray );
  };

  const updateAlbum = (newArray) => {
    setAlbums( newArray );
  };
  
  const updateTrack = (newArray) => {
    setTracks( newArray );
  };

  const updateReadyState = (newReadyState) => {
    setReadyState( newReadyState );
  }

  React.useEffect(() => {
/*
    fetch("/spotifyapi/token")
      .then(result => {
        return result.text();
      })
      .then( (result) => {
          setAccessToken(result);
          setIsLoading(false);
      })
      .catch(error => {
          setIsLoading(true);
          setError(error);
      })
*/
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {  
    return <LoadingPage />
  } else {
    return (
      <BrowserRouter basename={URL_BASENAME}>
        <SpotifyContext.Provider value={{ 
          accessToken: accessToken, 
          artists: artists,
          albums: albums,
          tracks: tracks,
          updateArtist: updateArtist,
          updateAlbum: updateAlbum,
          updateTrack: updateTrack,
          readyState: readyState,
          updateReadyState: updateReadyState
        }}>
          <PlaylistProvider>
            <Switch>
              <RouteWrapper exact path="/" component={LandingPage} layout={LayoutLanding} />
              <RouteWrapper path="/results" component={ResultsPage} layout={LayoutOther} />
              <RouteWrapper path="/playlist/:playlistId" component={PlaylistPage} layout={LayoutPlaylist} />
            </Switch>
          </PlaylistProvider> 
        </SpotifyContext.Provider>
      </BrowserRouter>
    );
  }
}

function RouteWrapper({ component: Component, layout: Layout, ...rest}) {
  return (
    <Route {...rest} render={(props) =>
      <Layout {...props}>
        <Component {...props} />
      </Layout>
    } />
  );
}


export default App;