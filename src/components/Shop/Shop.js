import React from 'react';
import fakeData from '../../fakeData';
import {useState, useEffect} from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10= fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if (products.length > 0){
            const previousCart = productKeys.map(existingKey => {
                const product = fakeData.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
            })
            setCart(previousCart);
        }
      }, [products])


   const handleAddProduct =(product)=>{
       // console.log('Product Added', product);
       const toBeAddedKey = product.key;
       const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
       let count = 1;
       let newCart;
       if(sameProduct){
           count = sameProduct.quantity + 1;
           sameProduct.quantity = count;
           const others = cart.filter(pd => pd.key !== toBeAddedKey);
           newCart = [...others, sameProduct];
       }else{
            product.quantity = 1;
            newCart = [...cart, product];
       }
     
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }


    
    
    return (
        <div>
        
        <div className="twin-container">
           <div className="product-container">
              {products.map(pd => <Product 
              showAddBtn={true}
              handleAddProduct ={handleAddProduct}
              product={pd}
              key={pd.key}
              ></Product> )}  
           </div>
           <div className="cart-container">
              
                <Cart cart ={cart}>
                <Link to='/review'><button className="main-button">Review order</button></Link>
                </Cart>
           </div>
        </div>
        </div>
    );
};

export default Shop;