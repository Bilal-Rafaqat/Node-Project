const db = require("../models");
const User = db.User;

exports.create = async(req,res)=>{
  
  let errors = 0;
  const user = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
    }
    //validation
  if(!req.body.name||!req.body.password||!req.body.email){
    errors++;
    console.log("All fields require");
  }
    //password validation
  const cnfrmPass = req.body.cnfrmPass;
  if(req.body.password != cnfrmPass){
    errors++;
    console.log("password dont match");
  }
  if(req.body.password.length<5){
    errors++;
    console.log("password is short");
  }
    //email validation
    const project = await User.findOne({ where: { email: req.body.email } });
    if (project === null) {
      console.log('Not found!');
    } else {
      errors++;
      console.log("email exist");
      }
  
  
    if(errors>0){
    res.status(400).send("error found");
  } else{
    User.create(user)
    .then((user) => {
    
       res.send(user);
   }).catch((err) => {
    res.send(`Error: ${err.message}`);
   });
  }
};
exports.findall = (req, res)=>{
    User.findAll()
      .then((data) => {
         res.send(data);
      }) 
      .catch((err) => {
        res.send(`Error: ${err.message}`);
      });
     
};

exports.login = async (req, res)=>{
  let error = 0;

  //validation
  if(!req.body.password||!req.body.email){
    error++;
    console.log("All fields require");
  }

  const data = await User.findOne({ where: { email: req.body.email } });
  if (data !== null) {
    console.log('Email found!');
    if(data.password!==req.body.password){
      error++;
      console.log("Password dont match");
    }
  }else {
      error++;
      console.log("email dont exist");
    }

  if(error>0){
    res.status(400).send("error found");
  }else{
  res.send("Welcome to Dashboard")
  }
   
};