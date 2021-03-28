import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css';
import { UserContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';

const Shipment = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => {
        console.log(data);
        const savedCart = getDatabaseCart();
        const orderDetails = {...loggedInUser, products: savedCart, shipment: data, orderTime: new Date()};
        fetch('https://safe-brook-46245.herokuapp.com/addOrder',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(orderDetails)
        })
        .then(res => res.json())
        .then(data =>{
            if(data){
                processOrder()
                alert('Your order placed successfully')
            }
        })
    }

    console.log(watch("example"));
    return (
        <div className="ship">
            <div className="container">
                <div className="col-md-6 mx-auto bg-white ship-form-area p-3">
                    <div className=" ship-form">
                        <form onSubmit={handleSubmit(onSubmit)}>
                        <input name="name" defaultValue={loggedInUser.name} ref={register({ required: true })} placeholder="Your name" />
                        {errors.name && <span className="error">This name is required</span>}
                        <input name="email" defaultValue={loggedInUser.email} ref={register({ required: true })} placeholder="Your email"/>
                        {errors.email && <span className="error">This email is required</span>}
                        <input name="address" ref={register({ required: true })} placeholder="Your address"/>
                        {errors.address && <span className="error">This address is required</span>}
                        <input name="phone" ref={register({ required: true })} placeholder="Your phone no."/>
                        {errors.phone && <span className="error">This phone No. is required</span>}
                        <input type="submit" />
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}

export default Shipment;
