/*global angular*/

(function (angular) {

  'use strict';

  angular.module('app').factory('f1Factory', [ 'CONFIG', '$http', function (CONFIG, $http) {
    function successCallback(response) {
      return response.data;
    }

    function errorCallback(response) {
      return 'Something went wrong. Try it later!';
    }

    return {
      getSignedUrl: function (filename, filetype, callback) {
        $http.post(CONFIG.REAL_API_URL + '/endpoint', { name: filename, type: filetype })
          .success(function (resp) {
            callback(null, resp);
          })
          .error(function (resp) {
            callback("An Error Occurred Attaching Your File");
          });
      }
    };

  }]);

}(angular));
