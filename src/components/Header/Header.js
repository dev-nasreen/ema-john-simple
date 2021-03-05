import React from 'react';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Header.css';


const Header = (props) => {
    const cart = props.cart;
    //console.log(cart);
     
  
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <div>
                <nav>
                    
                    <a href="/shop">Shop</a>
                    <a href="/review">Order Review</a>
                    <a href="/inventory">Manage Inventory</a>
                </nav>
                <input type="text" placeholder="Type here to search" />
                <span className="myCart"><FontAwesomeIcon icon={faShoppingCart} style={{display:'inline-block', marginRight:'5px'}}/></span>
                
            </div>
        </div>
    );
};

export default Header;