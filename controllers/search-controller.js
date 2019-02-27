var SpotifyWebApi = require('spotify-web-api-node');

const id = process.env.ID;
const secret = process.env.SECRET;

var spotifyApi = new SpotifyWebApi({
  clientId: id,
  clientSecret: secret,
});

spotifyApi.clientCredentialsGrant().then(
    function(data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
);
module.exports = {
    searchByTrack: (req,res)=>{
        spotifyApi.searchTracks(req.params.q)
            .then((data)=>{
                res.json(data);
            })
            .catch((err)=>{
                res.json(err);
            })
    }
};