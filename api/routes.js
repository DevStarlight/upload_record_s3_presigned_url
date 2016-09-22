/*jslint node: true */

'use strict';

var router = require('express').Router();

var endpoint1 = require('./routes/endpoint');

// create story
router.post('/endpoint', function (req, res, next) {
  if (!req.body.name || !req.body.type) {
    res.status(400).send('fail');
  } else {
    endpoint1.getSignedUrl(req.body.name, req.body.type, function (data) {
      res.status(200).send(data);
    });
  }
});

module.exports = router;
