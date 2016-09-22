Simple APP to capture Video from cordoba-plugin-capture and upload to S3 by previously request a signedURL:

USAGE:

  1- Go to /api (nodeJS root) folder and install all the dependencies by `npm install`
  2- Go to /apk (angularJS root) folder and install android `cordova platform add android`
  3- Go to `/apk/www/assets` folder and do `npm install` and `bower install`.
  4- Change API endpoints in `/apk/www/app.js` so it gets your real localhost API. 

nodeJS:

	http://localhost:3000/api/endpoint gives you the URI by using getSignedURL from AWS-SDK.

