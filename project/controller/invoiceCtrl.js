const db = require("../models");
const Invoice = db.Invoice;

exports.packages = (req , res)=>{
    if(req.body!==null){
        let price=0;
        req.body.package=='weekly'?price=2000:price=8000;
       const invoice= {
                invoice: req.body.package,
                user_Id: req.body.userId,
                ammount:  price,
                status: 'not paid',
                approved: false

            }
            Invoice.create(invoice)
            .then(invoice=>{
                res.send(invoice);
            }).catch(err=>{
                res.send(err);
            })
        }
    
    else{
        res.send('Please Select valid Option');
    }
}