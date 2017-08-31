var express = require('express');
var router = express.Router();

var renderHomepage = function(req, res){
  res.render('layout', {title: 'LocatoR'});
};

router.get('/', renderHomepage);

module.exports = router;