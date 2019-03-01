const client = require('../modules/spotify-client');
module.exports = (req,res)=>{
    const offset = req.query.offset | 0;
    const limit = req.query.offset | 10;
    const query = req.query.q;
    client.searchTracks(query,{
        limit: limit,
        offset: offset
    }).then(
        function(data) {
            let items = data.body.tracks.items;
            let next = data.body.tracks.next;
            let promiseArr = items.map(function (element) {
                return client.getAudioFeaturesForTrack(element.id).then((metadata)=>{
                    return {
                        name : element.name,
                        artist : element.artists[0].name,
                        bpm: metadata.body.tempo,
                        album : element.album.name,
                        photo : element.album.images[0].url
                    };
                });    
            });
            
            Promise.all(promiseArr).then(function(resultsArray){
                const result = {
                    next: next,
                    songs: resultsArray
                }
                res.status(200).json(result);   
            }).catch(function(err){
                res.status(400).send({});
            })

            
        },
        function(err) {
            res.status(400).send({});
        }
    );
}
