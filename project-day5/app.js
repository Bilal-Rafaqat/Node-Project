const express = require('express');
const app = express();
const port = 4000;
const cookieParser = require('cookie-parser');

const db = require('./models');
db.sequelize.sync();

app.use(express.json());
app.use(cookieParser());
require('./routes/userRoute')(app);
require('./routes/invoiceRoute')(app);
require('./routes/adminRoute')(app);
app.get('/',(req, res)=>{
    res.send("Welcome to Home Chef Api");
})


app.listen(port,()=>{
    console.log(`Listning on port ${port}`);
})