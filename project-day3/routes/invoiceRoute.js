const router = require('express').Router();
const auth = require('../controller/auth')
const invoice = require('../controller/invoiceCtrl');

module.exports = app =>{

    router.post('/user/packages',auth.isUser, invoice.packages);

    app.use('/api/home-chef', router);
}
