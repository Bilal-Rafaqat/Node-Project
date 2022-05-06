const express = require("express");
const app =  express();
const port = 3000;
const db = require('./models');
db.sequelize.sync();

app.use(express.json());
require('./routes/user')(app);
require('./routes/admin')(app);
app.get('/',(req,res)=>{
    res.send("Welcome to Home Service App");
})
app.listen(port,()=>{
    console.log(`Listning on port ${port}`);
})