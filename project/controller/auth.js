exports.isUser = async (req, res)=>{
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
      res.status(400).send("User Denied");
    }else{
    res.send("User Approved");
    }
}