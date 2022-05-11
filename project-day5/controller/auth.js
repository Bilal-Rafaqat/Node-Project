const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.User;
const Admin = db.Admin;

exports.isUser = async (req, res, next) =>{

  const data = await User.findOne({ where: { id: req.body.id } });
  if(data!==null&&data.token!==null&&data.role=="user"){
    if(jwt.verify(data.token, config.secret)){
    req.body.token = data.token;
    console.log('User verfied');
    return next();
  }
}
  else{
    return res.status(400).send('Please Login first');
  }
}
exports.isAdmin = async (req, res, next) =>{ 

  const data = await Admin.findOne({where: { id: req.body.id}});
  if(data!==null&&data.role=="admin"&&data.token!==null){
    if(jwt.verify(data.token, config.secret)){
    console.log('Admin verfied');
    return next();
    }
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