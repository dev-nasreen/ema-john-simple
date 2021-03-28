import React from 'react';
import fakeData from '../../fakeData';
import {useState, useEffect} from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { Link } from 'react-router-dom';
import source from '../../images/source.gif'
import './Shop.css';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    //const first10= fakeData.slice(0, 10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{
        fetch('https://safe-brook-46245.herokuapp.com/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    },[])
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
       
        fetch('https://safe-brook-46245.herokuapp.com/productsByKeys',{
            method:'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
      }, [])


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
               {products.length === 0 && <p>Looding.......</p>}
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