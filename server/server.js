
const express = require('express');
const app = express();

const path = require('path');

var spotifyRoute = require('./routes/spotifyapi');
var youtubeRoute = require('./routes/youtubeapi');

app.use('/spotifyapi', spotifyRoute.router);
app.use('/youtubeapi', youtubeRoute);

app.use(express.static(path.join(__dirname, 'build')));

/* GET listener tests */
app.get('/ping', function (req, res) {
  return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


/*
    Request Spotify token on start
*/
spotifyRoute.newToken();

/*
    Request new token after 60 minutes
*/
var tokenRefreshInterval = setInterval(spotifyRoute.newToken, 1000 * 60 * 60);




app.listen(process.env.PORT || 8080);