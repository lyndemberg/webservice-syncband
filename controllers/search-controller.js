module.exports = (spotifyWrapper) =>{
    return (req,res)=>{
      spotifyWrapper.searchTracks(req.params.q)
            .then((data)=>{
                res.json(data);
            })
            .catch((err)=>{
                res.json(err);
            })
    }
};