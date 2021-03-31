var express = require('express');
var router = express.Router();
 
router.get('/write', function(req, res, next) {
  res.send('Router 게시판')
});

router.get('/read', function(req, res, next) {
  res.send('Router 게시판 읽기')
});

router.get('/edit', function(req, res, next) {
  res.send('확인')
});

