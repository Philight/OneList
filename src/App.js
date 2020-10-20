import React, { Component } from "react";
import './App.css';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import LandingPage from './components/LandingPage';
import ResultsPage from './components/ResultsPage';
import { LayoutLanding } from './layouts/LayoutLanding';
import { LayoutOther } from './layouts/LayoutOther';

import { SpotifyContext } from './components/SpotifyContext';

function App() {
  const [accessToken, setAccessToken] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState();

  // [ {url:string, images:{}, name:string},.. ] 
  const [artists, setArtists] = React.useState( [{ }] );
  // [ {url:string, images:{}, name:string, artists:[]},.. ]
  const [albums, setAlbums] = React.useState( [{ }] );
  // [ {url:string, images:{}, name:string, artists:[], album:[]},.. ]
  const [tracks, setTracks] = React.useState( [{ }] );


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

  React.useEffect(() => {
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
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (isLoading) {  
    return <div>Loading...</div>;
  } else {
    return (
      <BrowserRouter>
        <SpotifyContext.Provider value={{ 
          accessToken: accessToken, 
          artists: artists,
          albums: albums,
          tracks: tracks,
          updateArtist: updateArtist,
          updateAlbum: updateAlbum,
          updateTrack: updateTrack
        }}>
          <Switch>
            <RouteWrapper exact path="/" component={LandingPage} layout={LayoutLanding} />
            <RouteWrapper path="/results" component={ResultsPage} layout={LayoutOther} />
          </Switch>
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