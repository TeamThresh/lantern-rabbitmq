var express = require('express');
var mq = require('../mq/enqueue');
var router = express.Router();

router.post('/api/upload', mq.enqueueDump);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
