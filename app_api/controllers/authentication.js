var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

var sendJSONresponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};
//Register controller
module.exports.register = function (req, res) {
  if (!req.body.name || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  var user = new User();
  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);
  user.save(function (err) {
    var token;
    if (err) {
      sendJSONresponse(res, 404, err);
    } else {
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
    }
  });
};

//login controller
module.exports.login = function(req, res){
  //validate that the required fields have been supplied
  if(!req.body.email || !req.body.password){
    sendJSONresponse(res, 400, {
      "message": "All fields required"
    });
    return;
  }
  
  //pass name of strategy and a callback to authenticate method
  passport.authenticate('local', function(err, user, info){
    var token;
    //return error if passport returns an error
    if(err){
      sendJSONresponse(res, 404, err);
      return;
    }
    //if passport returned a user instance, generate and send a JWT
    if(user){
      token = user.generateJwt();
      sendJSONresponse(res, 200, {
        "token": token
      });
      //Otherwise return info message why authentication failed
    } else {
      sendJSONresponse(res, 401, info);
    }
    //make sure that req and res are available to passport
  })(req, res);
};