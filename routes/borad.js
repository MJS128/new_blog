var express = require('express');
var router = express.Router();
 
router.get('/write', function(req, res, next) {
  res.send('Router 게시판')
});