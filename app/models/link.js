var db = require('../config');
var crypto = require('crypto');
var mongoose = require('mongoose');

var urlSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamp: {
    type: Date,
    default: Date.now
  }
});

var createSha = function(url) {
  var shasum = crypto.createHash('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

urlSchema.pre('save', function(next) {
  this.code = createSha(this.url);
  next();
});

var Link = mongoose.model('Link', urlSchema);

module.exports = Link;
