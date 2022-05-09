const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.isUser = (req, res, next) =>{ 
 if(jwt.verify(req.body.token, config.secret))
 try{
   console.log('User verfied');
 }
 catch{
   res.status(400);
 }
  next();
}