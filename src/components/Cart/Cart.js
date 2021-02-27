import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    console.log(cart);
    const total = cart.reduce((total, product) => total + product.price, 0);
   // let Shipping = 0;
    let Shipping = (total >500) ? 0 : (total > 100) ? 5.50 : 10.50; 
    const tax = total * .10;
    const formatNumber = num =>{
        const digit = num.toFixed(2);
        return Number(digit);
    }
    // if(total >500){
    //     Shipping = 0;
    // }else if(total > 49){
    //     Shipping = 5.50
    // }else if(total >0){
    //     Shipping = 10.50
    // }
    const grandTotal = total + tax + Shipping 
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered:{cart.length}</p>
            <p>Product Price:{formatNumber(total)}</p>
            <p><small>Shipping Cost: {Shipping}</small></p>
            <p>Tax + VAT: {formatNumber(tax)} </p>
            <p>Total Price: {formatNumber(grandTotal)}</p>
            
        </div>
    );
};

export default Cart;