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
exports.isAdmin = (req, res, next) =>{ 
  const token = parseJwt(req.body.token);
  if(token.admin==true){
    console.log('Admin verfied');
    return next();
  }
  else{
    console.log('user is not admin'); 
    return res.status(403).send('User is not Admin');   
  }
  
 }
 function parseJwt(token) {
  var base64Payload = token.split('.')[1];
  var payload = Buffer.from(base64Payload, 'base64');
  return JSON.parse(payload.toString());
}