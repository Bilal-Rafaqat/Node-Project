const router = require('express').Router();
const user = require('../controller/userCtrl');

module.exports = app =>{

    router.post('/user/login', user.login);
    router.post('/user/register', user.create);
    
    app.use('/api/home-chef', router);
}

