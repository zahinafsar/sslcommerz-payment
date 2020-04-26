const express = require('express');
const app = express();
const initiatePayment = require("./initiatePayment");
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/sslcommerz',async (req,res)=>{
    const user = {
        name : "Nurul Huda",
        email: "nurul@24nme.com",
        phone: "01948297466"
    }
    let paymentSession = await initiatePayment(user, "REF123","485454", req.body.amount);
    // Send session for payment
    console.log(paymentSession);
    
    console.log("SSLCOMMERZ- Payment Initiation:", paymentSession.status);
    res.json({ message: "GWURL", gwUrl: paymentSession.GatewayPageURL, success: true });
})


const port = process.env.PORT || 4000;
app.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})