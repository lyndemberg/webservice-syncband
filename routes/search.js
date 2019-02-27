var express = require('express');
var router = express.Router();
const SearchController = require('../controllers/search-controller');

router.get('/', (req, res)=> {
  SearchController.searchByTrack(req,res);
});

module.exports = router;
