import React,{useState,useEffect} from 'react';
import './App.css';
import Payments from "./payment";
import Success from "./sslcommerz/success";
import Failed from "./sslcommerz/failed"
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

function App() {
  return (
    <Router>
    <Switch>
          <Route exact path="/" component={Payments}/>
          <Route path="/sslcommerz/success" component={Success}/>
          <Route path="/sslcommerz/failed" component={Failed}/>
	</Switch>
	</Router>
  );
}

export default App;
