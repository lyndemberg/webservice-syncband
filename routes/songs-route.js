const express = require('express');
const router = express.Router();

const Actions = require('../controllers/song-controller');

router.post('/',function (req,res){
  Actions.create(req,res);
});

router.get('/search', function(req, res, next) {
  Actions.retrieve(req,res);
});


module.exports = router;