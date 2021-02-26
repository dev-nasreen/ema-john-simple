import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    return (
        <div className='header'>
            
            <img src={logo} alt=""/>
            <div>
            <nav>
                <a href="/shop">Shop</a>
                <a href="/review">Order Review</a>
                <a href="/manage">Manage Inventory</a>
                
            </nav>
           
           <input type="text" placeholder="Type here to search"/> 
            </div> 
        </div>
    );
};

export default Header;