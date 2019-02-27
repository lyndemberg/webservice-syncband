var SpotifyWebApi = require('spotify-web-api-node');

const id = process.env.ID;
const secret = process.env.SECRET;

var tokenExpirationEpoch;
var spotifyApi = new SpotifyWebApi({
  clientId: id,
  clientSecret: secret,
});
spotifyApi.clientCredentialsGrant().then(
    function(data) {
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
        tokenExpirationEpoch = new Date().getTime() / 1000 + data.body['expires_in'];
        console.log('Retrieved token. It expires in ' + 
            Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) + ' seconds!');
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
);

setInterval(function() {
    console.log(
      'Time left: ' +
        Math.floor(tokenExpirationEpoch - new Date().getTime() / 1000) +
        ' seconds left!'
    );
  
    if (++numberOfTimesUpdated > 5) {
      clearInterval(this);
  
      // Refresh token and print the new time to expiration.
      spotifyApi.refreshAccessToken().then(
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

  module.exports = spotifyApi;