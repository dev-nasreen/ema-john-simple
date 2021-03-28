import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    useEffect(() =>{
        fetch('https://safe-brook-46245.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    },[productKey])

    //const product =fakeData.find(pd => pd.key === productKey);
    return (
        <div>
            <h1>{productKey} </h1>
            <Product showAddBtn={false} product={product}></Product>
        </div>
    );
};

export default ProductDetail;