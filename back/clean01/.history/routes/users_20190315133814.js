var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({user: '1', id: 'fede'});
});

module.exports = router;
