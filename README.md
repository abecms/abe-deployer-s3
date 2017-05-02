# abe-deployer-s3
A Abe deployer for S3

## Introduction
This plugin is a S3 deployer for your Abe blog. Once you've created your s3 repository on AWS and created a user with proper authorizations in IAM, just install this plugin with Abe and fill in the parameters.

Everytime you'll publish/unpublish a content, your blog will be sync'ed 

## Configuration
In abe.json, you must have this entry:

```
"deployers": {
  "s3": {
    "active":"true",
    "region": "eu-central-1",
    "accessKeyId": "yourAccesKeyID",
    "secretAccessKey": "yourSecretAccesKey",
    "bucket": "yourBucketName",
    "prefix": "yourPrefix",
    "params": {
      "maxAsyncS3": "20", 
      "s3RetryCount": "3",
      "s3RetryDelay": "1000",
      "multipartUploadThreshold": "20971520",
      "multipartUploadSize": "15728640"
    }
  }
}
```

If you don't want to change the params, don't create the entry for params:
```
"deployers": {
  "s3": {
    "active":"true",
    "region": "eu-central-1",
    "accessKeyId": "yourAccesKeyID",
    "secretAccessKey": "yourSecretAccesKey",
    "bucket": "yourBucketName",
    "prefix": "yourPrefix"
  }
}
```

