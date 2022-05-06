module.exports = app =>{
    const user = require('../controller/user');
    const router = require('express').Router();

    router.post('/register-user',user.create);
    router.get('/all-user',user.findall);
    router.post('/user-login',user.login);

    app.use('/api/home-chef', router);
}