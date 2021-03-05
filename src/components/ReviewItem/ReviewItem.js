import React from 'react';

const ReviewItem = (props) => {
    const {name, key, quantity, price}  = props.product;
    return (
        <div className="product-container">
            <h2 className="product-name">{name}</h2>
            <p>price: <small>${price}</small></p>
            <p>Quantity: {quantity}</p>
            <br/>
            <button className="main-button" onClick={() => props.removeProduct(key)}>
                Remove
            </button>


        </div>
    );
};

export default ReviewItem;