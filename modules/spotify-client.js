const SpotifyWebApi = require('spotify-web-api-node');

const id = process.env.ID;
const secret = process.env.SECRET;

const client = new SpotifyWebApi({
    clientId: id,
    clientSecret: secret
});
client.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      client.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log(
        'Something went wrong when retrieving an access token',
        err.message
      );
    }
);
module.exports = client;