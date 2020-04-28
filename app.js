const express = require("express");
const app = express();
const axios = require("axios");
const initiatePayment = require("./initiatePayment");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.post("/sslcommerz", async (req, res) => {
  const user = {
    name: "Zahin Afsar",
    email: "afsarzahin@gmail.com",
    phone: "01787849609",
  };
  let paymentSession = await initiatePayment(
    user,
    "REF123",
    "485454",
    req.body.amount
  );
  console.log("SSLCOMMERZ- Payment Initiation:", paymentSession.status);
  res.json({
    message: "GWURL",
    gwUrl: paymentSession.GatewayPageURL,
    success: true,
  });
});




  app.post("/sslcommerz/ipn", async (req, res) => {
    if (req.body.status == "VALID") {
      const url ="https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";
        const data = await axios(url, {
        parmas: {
          val_id: req.body.val_id,
          store_id: "zahin5ea43cff62d5b",
          store_passwd: "zahin5ea43cff62d5b@ssl"
        }
      });
      if(data.status === 200) {
      // EVERYTHING WAS RIGHT DO WORK WITH YOUR SYSTEM NOW
      console.log(req.body.amount+" tk recharged successfully");
      }
    }else(
      console.log("account recharge "+req.body.status)
    )
  });




//Payment redirections
app.post("/sslcommerz/:status", (req, res) => {
  ("REDIRECT CALLED: ", req.params.status);
  
  if (req.params.status == "success")
    return res.redirect("http://localhost:3000/sslcommerz/success");
  if (req.params.status == "failed" || req.params.status == "cancel")
    return res.redirect("http://localhost:3000/sslcommerz/failed");
});








const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
