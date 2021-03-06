import React, { useContext } from 'react';
import logo from '../../images/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';


const Header = (props) => {
    const cart = props.cart;
    //console.log(cart);
     
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div className='header'>
            <img src={logo} alt="" />
            <div>
                <nav>
                    
                    <Link to="/shop">Shop</Link>
                    <Link to="/review">Order Review</Link>
                    <Link to="/inventory">Manage Inventory</Link>
                    
                      {loggedInUser.email ? <span className="user-name">{loggedInUser.name}</span> : <Link  to="/login"><span className="logout-btn">Login</span></Link>}
                     
                      {loggedInUser.email && <span className=" logout-btn"><span onClick={ () => setLoggedInUser({})}>LogOut</span></span>} 
                </nav>
                <input type="text" placeholder="Type here to search" />
                <span className="myCart"><FontAwesomeIcon icon={faShoppingCart} style={{display:'inline-block', marginRight:'5px'}}/></span>
                
            </div>
        </div>
    );
};

export default Header;