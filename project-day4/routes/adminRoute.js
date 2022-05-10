const router = require('express').Router();
const admin = require('../controller/adminCtrl');

module.exports = app =>{

    router.post('/admin/login', admin.login);
    router.post('/admin/register', admin.create);
    
    app.use('/api/home-chef', router);
}

