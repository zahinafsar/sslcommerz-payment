const express = require('express');
const app = express();
const initiatePayment = require("./initiatePayment");
app.use(express.json());
app.use(express.urlencoded({extended : false}));

app.post('/sslcommerz',async (req,res)=>{
    let paymentSession = await initiatePayment("zahin", "1823452355", "REF123", req.body.amount);
    // Send session for payment
    console.log("SSLCOMMERZ- Payment Initiation:", paymentSession.status);
    res.json({ message: "GWURL", gwUrl: paymentSession.GatewayPageURL, success: true });
})


const port = process.env.PORT || 4000;
app.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})