const Song = require('../model/song');
const url = require('url');
const queryString = require('querystring');

const callback = (err,data,res)=>{
    if(err) return console.log('Erro: ', err);
    res.type('json');
    return res.end(JSON.stringify(data));
};
const getQuery = (urlCompleta)=>{
    const url_parts = url.parse(urlCompleta);
    return queryString.parse(url_parts.query);
};
const Actions = {
    create: (req,res)=>{
        Song.create(req.body,(err,data)=>callback(err,data,res));
    },
    retrieve: (req,res)=>{
        const query = getQuery(req.url);
        Song.find(query,(err,data)=>callback(err,data,res));
    }
};

module.exports = Actions;