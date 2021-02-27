import React from 'react';
import fakeData from '../../fakeData';
import {useState} from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import './Shop.css';
import Header from '../Header/Header';

const Shop = () => {
    const first10= fakeData.slice(0, 10);
    console.log(first10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);


    const handleAddProduct =(product)=>{
        console.log('Product Added', product);
        const newCart = [...cart, product];
        setCart(newCart);
    }


    
    
    return (
        <div>
        <Header cart ={cart}></Header>
        <div className="twin-container">
           <div className="product-container">
              {products.map(pd => <Product 
              handleAddProduct ={handleAddProduct}
              product={pd}
              ></Product> )}  
           </div>
           <div className="cart-container">
              
                <Cart cart ={cart}></Cart>
           </div>
        </div>
        </div>
    );
};

export default Shop;