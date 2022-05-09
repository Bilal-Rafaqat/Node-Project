const router = require('express').Router();
const user = require('../controller/userCtrl');
const auth = require('../controller/auth');



module.exports = app =>{

    router.post('/user/login', user.login);
    router.post('/user/register', user.create);
    
    app.use('/api/home-chef', router);
}

