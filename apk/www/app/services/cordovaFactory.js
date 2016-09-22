/*global angular, document, FileUploadOptions, FileTransfer*/
/*jslint node: true, nomen: true */

(function (angular) {

  'use strict';

  angular.module('app').factory('fCordovaPlugins', ['CONFIG', '$cordovaCapture', '$cordovaFileTransfer', function (CONFIG, $cordovaCapture, $cordovaFileTransfer) {
    var p = 0;
    return {
      record: function (callback) {

        var options = {
          limit: 1,
          duration: 300,
          quality: 0
        };

        document.addEventListener("deviceready", function () {
          $cordovaCapture.captureVideo(options).then(function (videoData) { // Success! Video data is here
            callback(null, videoData);
          }, function (err) { // An error occurred. Show a message to the user
            callback(err);
          });
        }, false);
      },
//      OPTION 1

//      uploadS3: function (url, videoPath, name, type) {
//
//        var ft, options;
//
//        options = new FileUploadOptions();
//        options.chunkedMode = false;
//        options.httpMethod = 'PUT';
////        options.fileKey = 'file';
////        options.fileName = 'uploads/' + name;
////        options.mimeType = type;
//        options.headers = {
//          "Content-Type": type,
//          "x-amz-acl": "public-read"
//        };
//
//        ft = new FileTransfer();
//        ft.upload(videoPath, url, function (success) {
//          console.log(success);
//        }, function (err) {
//          console.log("An error has occurred: Code = " + err.code);
//          console.log("upload error source " + err.source);
//          console.log("upload error target " + err.target);
//          console.log("http status: " + err.http_status);
//          console.log("description: " + err.body);
//        }, options);
//
//      }

//      OPTION 2

      uploadS3: function (server, filePath, name, type) {
        var options = {
          fileKey: 'file',
          fileName: name,
          chunkedMode: false,
          httpMethod: 'PUT',
          mimeType: "application/octet-stream",
          headers: {
            "Content-Type": "application/octet-stream"
          }
        };

        $cordovaFileTransfer.upload(server, filePath, options)
          .then(function (result) {
            console.log(result);
          }, function (err) {
            console.log("An error has occurred: Code = " + err.code);
            console.log("upload error source " + err.source);
            console.log("upload error target " + err.target);
            console.log("http status: " + err.http_status);
            console.log("description: " + err.body);
          }, function (progress) {
            console.log(progress);
          });
      }

    };
  }]);
}(angular));
