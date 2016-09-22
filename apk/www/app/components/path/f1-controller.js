/*global angular, console*/

(function (angular) {

  'use strict';

  angular.module('app').controller('f1Controller', [ 'f1Factory', 'fCordovaPlugins', function (f1Factory, fCordovaPlugins) {

    fCordovaPlugins.record(function (err, videoData) {
      if (err) {
        return console.log(err);
      }
      console.log(videoData);
      f1Factory.getSignedUrl(videoData[0].name, videoData[0].type, function (err, response) {
        if (err) {
          return console.log(err);
        }
        fCordovaPlugins.uploadS3(response, videoData[0].localURL, videoData[0].name, function (err) {
          if (err) {
            console.log(err);
          } else {
            console.log('done');
          }
        });
      });
    }, function (err) {
      console.log('Error code: ' + err.code, null, 'Capture Error');
    });

  }]);
}(angular));
