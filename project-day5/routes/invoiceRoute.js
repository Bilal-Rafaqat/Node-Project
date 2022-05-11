const router = require('express').Router();
const auth = require('../controller/auth')
const invoice = require('../controller/invoiceCtrl');

module.exports = app =>{
    router.post('/user/packages',auth.isUser, invoice.packages);
    router.put('/user/upload/invoice',auth.isUser, invoice.upload);
    router.post('/show/uploadInvoice',auth.isAdmin, invoice.showUploaded);
    router.put('/check/invoice',auth.isAdmin, invoice.check);

    app.use('/api/home-chef', router);
}
