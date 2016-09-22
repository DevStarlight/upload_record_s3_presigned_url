/*global angular, navigator, componentHandler, path*/

(function (angular) {

  'use strict';

  angular.module('app', [
    'ngCordova',
    'ui.router'
  ]);

  angular.module('app').run([
    '$rootScope',
    function ($rootScope) {
      $rootScope.$on('$viewContentLoaded', function (event, next) {
        componentHandler.upgradeAllRegistered();
      });
    }
  ]);

  angular.module('app').constant('CONFIG', {
    'REAL_API_URL': 'http://localhost:3000/api'
  });

  angular.module('app').config([
    '$stateProvider',
    '$urlRouterProvider',
    '$sceDelegateProvider',
    function ($stateProvider, $urlRouterProvider, $sceDelegateProvider) {
      $sceDelegateProvider.resourceUrlWhitelist([
        'self'
      ]);
      $urlRouterProvider
        .otherwise('/');

      $stateProvider
        .state('path', {
          url: '/',
          views: {
            'content': { templateUrl: 'app/components/path/f1.html' }
          }
        });
    }
  ]);
}(angular));
