import React from 'react';

const ReviewItem = (props) => {
    const {name, img, key, quantity, price}  = props.product;
    return (
        <div className="review-product" style={{width:'100%', height:'300px', borderBottom:'1px solid #ededed', padding:'20px'}}>
            <div style={{ display:'flex', overflow:'hidden'}}>
            <img src={img} alt=""/>
            <h2 className="product-name">{name}</h2>
            </div>
            <div style={{float:'right',display:'flex'}}>
            <p style={{marginRight:'20px'}}>price: <small>${price}</small></p>
            {/* <p>Quantity: {quantity}</p> */}
            
            <button className="main-button" onClick={() => props.removeProduct(key)}>
                Remove
            </button>
            </div>
            


        </div>
    );
};

export default ReviewItem;