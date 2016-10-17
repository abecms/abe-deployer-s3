var path = require('path');
var s3 = require('s3');
var AWS = require('aws-sdk');

function s3sync (abe) {
  this.abe = abe
  var accessKeyId
  var secretAccessKey
  var region
  var bucket
  var prefix
  
  var maxAsyncS3 = "20"
  var s3RetryCount = "3"
  var s3RetryDelay = "1000"
  var multipartUploadThreshold = "20971520"
  var multipartUploadSize = "15728640"

  if(abe.config.deployers && abe.config.deployers.s3){
    var elt = abe.config.deployers.s3
    accessKeyId = (elt.hasOwnProperty("accessKeyId"))?elt.accessKeyId:""
    secretAccessKey = (elt.hasOwnProperty("secretAccessKey"))?elt.secretAccessKey:""
    region = (elt.hasOwnProperty("region"))?elt.region:""
    bucket = (elt.hasOwnProperty("bucket"))?elt.bucket:""
    prefix = (elt.hasOwnProperty("prefix"))?elt.prefix:""

    if(elt.hasOwnProperty("maxAsyncS3")) maxAsyncS3 = elt.params.maxAsyncS3
    if(elt.hasOwnProperty("s3RetryCount")) s3RetryCount = elt.params.s3RetryCount
    if(elt.hasOwnProperty("s3RetryDelay")) s3RetryDelay = elt.params.s3RetryDelay
    if(elt.hasOwnProperty("multipartUploadThreshold")) multipartUploadThreshold = elt.params.multipartUploadThreshold
    if(elt.hasOwnProperty("multipartUploadSize")) multipartUploadSize = elt.params.multipartUploadSize

  }

  AWS.config.region = region
  AWS.config.accessKeyId = accessKeyId
  AWS.config.secretAccessKey = secretAccessKey
  var awsS3Client = new AWS.S3();

  this.client = s3.createClient({
    s3Client: awsS3Client,
    maxAsyncS3: maxAsyncS3,
    s3RetryCount: s3RetryCount,
    s3RetryDelay: s3RetryDelay,
    multipartUploadThreshold: multipartUploadThreshold,
    multipartUploadSize: multipartUploadSize
  });

  this.params = {
    localDir: path.join(abe.config.root, abe.config.publish.url),
    deleteRemoved: true,         
    s3Params: {
      Bucket: bucket,
      Prefix: prefix
    }
  };
};

s3sync.prototype.sync = function () {
  var uploader = this.client.uploadDir(this.params);
  uploader.on('error', function(err) {
    console.error("unable to sync:", err.stack);
  });
  uploader.on('progress', function() {
    console.log("Sync with your s3 repository in progress", uploader.progressAmount, uploader.progressTotal);
  });
  uploader.on('end', function() {
    console.log("done syncing your s3 repo");
  });
};

module.exports = s3sync;