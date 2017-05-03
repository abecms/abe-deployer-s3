'use strict';

var s3sync = require('../modules/s3sync');

var hooks = {
  afterPublish: function (result, filePath, abe) {
    if(abe.config.deployers && abe.config.deployers.s3 && abe.config.deployers.s3.active){
      var s3 = new s3sync(abe)
      s3.sync();
    }

    return result;
  },
  afterUnpublish: function (path, json, abe) {
    if(abe.config.deployers && abe.config.deployers.s3 && abe.config.deployers.s3.active){
      var s3 = new s3sync(abe)
      s3.sync();
    }

    return result;
  }
};

exports.default = hooks;
