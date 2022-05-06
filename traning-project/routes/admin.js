module.exports = app =>{
    const admin = require('../controller/admin');
    const router = require('express').Router();

    router.post('/register-admin',admin.create);
    router.get('/all-admin',admin.findall);
    router.post('/admin-login',admin.login);

    app.use('/api/home-chef', router);
}