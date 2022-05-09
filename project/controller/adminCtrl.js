const db = require("../models");
const bcrypt = require('bcrypt');
const Admin = db.Admin;
const jwt = require('jsonwebtoken');


const maxAge = 3*24*60*60;
const createToken = (id)=>{
    return jwt.sign({id},'Black hat',{
        expiresIn: maxAge
    });
}


exports.create = async (req,res)=>{
    let errors = [];
    const admin = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }
    Admin.create(admin)
    .then(admin=>{
       
        const token = createToken(admin.id);
        console.log(token);
        res.cookie('jwt',token,{httpOnly: true,maxAge: maxAge*1000});
        res.cookie('newUser', true, {maxAge: maxAge}); 
        res.status(201).json({admin: admin.id});
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
  
    const data = await Admin.findOne({ where: { email: req.body.email } });
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
    res.send("welcome");
    }
}
