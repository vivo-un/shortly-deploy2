var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

// userSchema.method('comparePassword', function(attemptedPassword, callback) {
//   bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
//     callback(null, isMatch);
//   });
// });
userSchema.pre('save', function(next) {
  var user = this;

  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
});


var User = mongoose.model('User', userSchema);


User.comparePassword = function(attemptedPassword, callback) {
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
    callback(null, isMatch);
  });
};

// just reading mongoosejs.com/docs/models.html for ideas
// // ???
// var user = new User({}).save(function(err) {
//   if(err) return handleError(err);
// })

// User.create({....}, function(err, ...) {
//   ...
// });

/*var User = db.Model.extend({
  tableName: 'users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(isMatch);
    });
  },
  hashPassword: function(){
    var cipher = Promise.promisify(bcrypt.hash);
    return cipher(this.get('password'), null, null).bind(this)
      .then(function(hash) {
        this.set('password', hash);
      });
  }
});
*/
module.exports = User;
