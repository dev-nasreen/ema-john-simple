import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
import Header from "./components/Header/Header";
import Inventory from "./components/Inventory/Inventory";
import LogIn from "./components/LogIn/LogIn";
import Notfound from "./components/Notfound/Notfound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Review from "./components/Review/Review";
import Shipment from "./components/Shipment/Shipment";
import Shop from './components/Shop/Shop';

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider  value={[loggedInUser, setLoggedInUser]}>
    <h3>Email:{loggedInUser.email} </h3>
    
      <Router>
      <Header></Header>
        <Switch>
        <Route exact path="/">
          <Shop></Shop>
          </Route>
          <Route path="/shop">
          <Shop></Shop>
          </Route>
          <Route path='/review'>
            <Review></Review>
          </Route>
          <PrivateRoute path='/shipment'>
            <Shipment></Shipment>
          </PrivateRoute>
          <Route path='/login'>
            <LogIn></LogIn>
          </Route>
          <PrivateRoute path="/inventory">
              <Inventory></Inventory>
          </PrivateRoute>
          <Route path="/product/:productKey">
            <ProductDetail></ProductDetail>
          </Route>
          <Route path="*">
              <Notfound></Notfound>
          </Route>
        </Switch>
      </Router>
    
      
     
    </UserContext.Provider>
  );
}

export default App;
