/*global universalLinks, console, angular, document, setTimeout, navigator, window */

'use strict';

var path = '/home';

var handlePath = null;

var handleOpenURL = function (url) {
  handlePath = url.replace('http://my_url.com/', '');
};

var CordovaInit = function () {

  var onDeviceReady, receivedEvent, bindEvents, pageRequested;

  pageRequested = function (eventData) {
    path = eventData.path.substr(1, eventData.path.length - 1).replace('http://my_url.com/', '');
  };

  onDeviceReady = function () {
    universalLinks.subscribe('openStoryPage', pageRequested, true);
    universalLinks.subscribe('openVideoPage', pageRequested, true);
    receivedEvent('deviceready', function () {
      navigator.splashscreen.hide();
    });
  };

  receivedEvent = function (event, callback) {
    console.log('Start event received, bootstrapping application setup.');

    var ngApp = document.querySelector('body');

    angular.element(ngApp).ready(function () {
      angular.bootstrap(ngApp, ['app']); // Manually add and boot Angularjs
      callback();
    });
  };

  this.bindEvents = function () {
    document.addEventListener('deviceready', onDeviceReady, false);
  };

  if (window.cordova !== undefined) {
    console.log('Cordova found, wating for device.');
    this.bindEvents();
  } else {
    console.log('Cordova not found, booting application');
    receivedEvent('manual', function () {
      console.log('App booted :)');
    });
  }
};

//document.addEventListener("pause", yourCallbackFunction, false);

document.addEventListener("resume", function () {
  if (handlePath) {
    window.location.href = '#/' + handlePath;
  }
  handlePath = null;
}, false);

console.log('Bootstrapping!');
var init = new CordovaInit();
