const db = require("../models");
const Invoice = db.Invoice;

exports.packages = (req , res)=>{
    console.log('before inoice')
    if(req.body!==null){
        let price=0;
        req.body.package=='weekly'?price=2000:price=8000;
       const invoice= {

                invoice: req.body.package,
                user_Id: req.body.id,
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

function parseJwt(token) {
    var base64Payload = token.split('.')[1];
    var payload = Buffer.from(base64Payload, 'base64');
    return JSON.parse(payload.toString());
  }


exports.upload = async (req, res)=>{
    console.log(req.body.invoice_id);
    const data = await Invoice.findOne({ where: { user_Id: req.body.id } });
    if(data){
        console.log('invoice found '+data.id+req.body.invoice_id); 
        if(data.id==req.body.invoice_id){
          console.log('user match with invoice');
          Invoice.update({
            status: req.body.invoice
           }, {
            where: { id: req.body.id }
           })
           res.send('invoice uploaded');
        }else{
            res.status(402).send('invoice found but not for current user')
        }
    }else{
        res.status(401).send('data not found')
    }
}

exports.showUploaded= (req, res)=>{
        
        Invoice.findAll({ where: { status: "uploaded" } })
        .then((data)=>{
            res.send(data);
        })
        .catch(err=>{
            res.status(401).send(err);
        })
}        
exports.check = async (req, res)=>{

    if(req.body.approved== true) {
         await Invoice.findOne({ where: { id: req.body.invoice_id } })
        .then((data)=>{
            console.log("ture");
            Invoice.update({
                status: "paid",
                approved:"true"
            }, {
                where: { id: req.body.invoice_id }
                })
            res.send(data);
          })
       .catch(err=>{
           res.status(401).send(err);
        })
    }else{
        await Invoice.findOne({ where: { id: req.body.invoice_id } })
        .then((data)=>{
            console.log("false");
            Invoice.update({
                status:"re-upload",
                approved: "false"
            }, {
                where: { id: req.body.invoice_id }
                })
            res.send(data)
          })
       .catch(err=>{
           res.status(401).send(err);
        })
    }
    
}