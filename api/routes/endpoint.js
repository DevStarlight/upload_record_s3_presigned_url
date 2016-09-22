/*jslint node: true */

'use strict';

var AWS = require('aws-sdk');

module.exports = {
  getSignedUrl: function (filename, type, callback) {
    if (filename && type) {
      AWS.config.update({
        accessKeyId: 'your_user_id',
        secretAccessKey: 'your_user_secret',
        region: "your_region"
      });

      var s3, key, params;

      s3 = new AWS.S3({
        signatureVersion: 'v4',
        region: "your_bucket_region"
      });

      key = 'your_folder_inside_bucket/' + filename;

      params = {
        Bucket: 'bucket_name',
        Key: key,
        ContentType: type,
        Expires: 60 * 10, //10 min max upload
        ACL: 'public-read'
      };

      // http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#getSignedUrl-property
      s3.getSignedUrl('putObject', params, function (err, url) {
        if (err) {
          callback(err);
        } else {
          callback(url);
        }
      });
    } else {
      callback('Error');
    }
  }
};
