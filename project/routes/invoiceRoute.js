const router = require('express').Router();
const invoice = require('../controller/invoiceCtrl');


module.exports = app =>{

    router.post('/user/packages', invoice.packages);

    app.use('/api/home-chef', router);
}

