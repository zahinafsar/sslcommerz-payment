import React, { useState,useEffect } from 'react';
import axios from 'axios';

const Payments=()=>{
  const [recharge,setRecharge] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: resd } = await axios.post("/sslcommerz", { amount: recharge });
    console.log(resd);
    window.location.replace(resd.gwUrl);
  }
    return (
      <React.Fragment>
            <form autoComplete="off" onSubmit={handleSubmit}>
              <input
                name="recharge"
                type="number"
                placeholder="Amount in BDT"
                value={recharge}
                onChange={e => setRecharge(e.target.value)}
              />
              <br />
              <button type="submit">recharge</button>
            </form>
      </React.Fragment>
    );
}

export default Payments;