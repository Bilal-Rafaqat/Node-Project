const db = require("../models");
const bcrypt = require('bcrypt');
const User = db.User;
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');


exports.create = async (req,res)=>{
    let errors = [];
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    User.create(user)
    .then(user=>{ 
        res.status(201).json(user);
    }).catch(err => {
        if(err){
        err.errors.forEach(element => {
            errors.push(element.message);
        });
    res.send(errors);}else{
        console.log(err);
    }    
    })
}
exports.login = async (req, res)=>{
    let error = 0;
  
    //validation
    if(!req.body.password||!req.body.email){
      error++;
      console.log("All fields require");
    }
  
    const   data = await User.findOne({ where: { email: req.body.email } });
    if (data !== null) {
      console.log('Email found!');

      if(await bcrypt.compare(req.body.password, data.password)){
        console.log("Password match");
      }else{
          error++;
          console.log("Password Dont match");
      }
    }else {
        error++;
        console.log("email dont exist");
      }
  
    if(error>0){
      res.status(400).send("error found");
    }else{
        let token = jwt.sign({ id: data.id }, config.secret, {
            expiresIn: 86400 // 24 hours
          });   
          const details = {
            token: token
          }
        console.log(token);
        res.send(details);
    }
}

