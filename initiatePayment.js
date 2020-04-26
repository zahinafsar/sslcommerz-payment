const axios = require('axios');
const qs = require('querystring')
require('dotenv').config();
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

const store = {
  "id": "<REPLACE WITH YOURS>",
  "password": "<REPLACE WITH YOURS>"
}

module.exports = async ({ name, email, address='Gulshan', city='Dhaka', country='Bangladesh', phone },uid, tranId, amount) => {
  const reqParams = {
    //credentials
    store_id: store.id,
    store_passwd: store.password,
    //transection info
    ipn_url: "http://localhost:4000/sslcommerz/ipn",
    currency: "BDT",
    success_url: "http://localhost:4000/sslcommerz/success",
    fail_url: "http://localhost:4000/sslcommerz/failed",
    cancel_url: "http://localhost:4000/sslcommerz/cancel",
    shipping_method: "NO",
    product_name: "payment testing",
    product_category: "Online Service",
    product_profile: "non-physical-goods",
    //customer info
    cus_name: name,
    cus_email: email,
    cus_phone: phone,
    cus_add1: address,
    cus_city: city,
    cus_country: country,
    tran_id: tranId,
    total_amount: amount,
    value_a: uid,
  };
  try {
    const { data } = await axios.post("https://sandbox.sslcommerz.com/gwprocess/v4/api.php", qs.stringify(reqParams), config);
    console.log("success");
    return data;
  } catch (error) {
    console.log("Error: Connecting with sslcommerz");
  }
};