'use strict';

var express = require('express');
var router = express.Router(); // eslint-disable-line new-cap
var watson = require('watson-developer-cloud');
var vcapServices = require('vcap_services');
var extend = (extend = require('util')._extend);

// set up an endpoint to serve speech-to-text auth tokens

// For local development, replace username and password or set env properties
var sttConfig = extend(
  {
    version: 'v1',
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    // username: process.env.STT_USERNAME || '7f4dfe88-a4af-497f-855e-1cc24d1bd9ea',
    // password: process.env.STT_PASSWORD || '6erTeowTymtX'
    username: process.env.STT_USERNAME || 'eea049cf-6adb-4e71-8bad-55f0687e6e13',
    password: process.env.STT_PASSWORD || '6RxoFaeTtIpF'
  },
  vcapServices.getCredentials('speech_to_text')
);

var sttAuthService = watson.authorization(sttConfig);

router.get('/token', function(req, res) {
  sttAuthService.getToken({ url: sttConfig.url }, function(err, token) {
    if (err) {
      console.log('Error retrieving token: ', err);
      res.status(500).send('Error retrieving token');
      return;
    }
    res.send(token);
  });
});

module.exports = router;
