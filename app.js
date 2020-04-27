const express = require('express');
const app = express();
const initiatePayment = require("./initiatePayment");
app.use(express.json());
app.use(express.urlencoded({extended : false}));
require('dotenv').config();


const validatePayment = (validationId) => {
  const options = {
    url:
      "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php" +
      "?val_id=" +
      validationId +
      "&store_id=" + "zahin5ea43cff62d5b" + "&store_passwd=" + `${process.env.storeKey}`,
    method: "GET"
  }
};




app.post('/sslcommerz',async (req,res)=>{
    const user = {
        name : "Zahin Afsar",
        email: "afsarzahin@gmail.com",
        phone: "01787849609"
    }
    let paymentSession = await initiatePayment(user, "REF123","485454", req.body.amount);
    // Send session for payment
    console.log(paymentSession);
    
    console.log("SSLCOMMERZ- Payment Initiation:", paymentSession.status);
    res.json({ message: "GWURL", gwUrl: paymentSession.GatewayPageURL, success: true });
})


app.post("/sslcommerz/ipn", async (req, res) => {
  // Validating payment
  if (req.body.status == "VALID" || req.body.status == "VALIDATED") {
    validatePayment(req.body.val_id);
  }
  console.log("IPN", req.body);
  res.send("working");
});


//Payment redirections
app.post('/sslcommerz/:status', (req, res) => {
  if (req.params.status == 'success') return res.redirect('http://localhost:3000/sslcommerz/success');
  if (req.params.status == 'failed' || req.params.status == 'cancel') return res.redirect('http://localhost:3000/sslcommerz/success');
})


const port = process.env.PORT || 4000;
app.listen(port,()=>{
	console.log(`server is running on port ${port}`)
})