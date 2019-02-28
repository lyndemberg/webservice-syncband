// require('./db/db-config');
const express = require('express');
const https = require('https');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//routes
const SongAPI = require('./routes/songs-route');
const SpotifyWebApi = require('spotify-web-api-node');
var requestNumber = 0;
const credentials = {
  clientId: process.env.ID,
  clientSecret: process.env.SECRET,
  redirectUri: process.env.REDIRECT_URI
};
var client = new SpotifyWebApi(credentials);
//aux
var tokenExpirationEpoch;
var numberOfTimesUpdated = 0;
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/song',SongAPI);
app.get('/api/song/search',(req,res)=>{
  if(requestNumber==0){
    getCodeAuthorizathion();
    refresh();
  }
  const query = req.query.q;
  client.searchTracks(query)
    .then((value)=>{
      res.json(value);
    },
    (err)=>{
      res.status(400).send({});
    })
});
app.get('/callback',(req,res)=>{
    const code = req.query.code;
    console.log('RETORNOU-> '+code);
    res.status(200).send({});
    client.authorizationCodeGrant(code).then(
      (data)=> {
          console.log('The token expires in ' + data.body['expires_in']);
          console.log('The access token is ' + data.body['access_token']);
          console.log('The refresh token is ' + data.body['refresh_token']);
      
          client.setAccessToken(data.body['access_token']);
          client.setRefreshToken(data.body['refresh_token']);
  
          tokenExpirationEpoch = new Date().getTime() / 1000 + data.body['expires_in'];
          console.log(
              'Retrieved token. It expires in ' +
              Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
              ' seconds!'
          );
      },
      (err)=> {
          console.log('Something went wrong!', err);
      });
});

function getCodeAuthorizathion(){
  console.log('autorizando o client');
}

function refresh(){
  setInterval(function() {
    console.log(
      'Time left: ' +
        Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
        ' seconds left!'
    );
  
    // OK, we need to refresh the token. Stop printing and refresh.
    if (++numberOfTimesUpdated > 5) {
      clearInterval(this);
  
      // Refresh token and print the new time to expiration.
      client.refreshAccessToken().then(
        function(data) {
          tokenExpirationEpoch =
            new Date().getTime() / 1000 + data.body['expires_in'];
          console.log(
            'Refreshed token. It now expires in ' +
              Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
              ' seconds!'
          );
        },
        function(err) {
          console.log('Could not refresh the token!', err.message);
        }
      );
    }
  }, 1000);
}

module.exports = app;
