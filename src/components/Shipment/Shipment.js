import React from 'react';
import { useForm } from 'react-hook-form';
import './Shipment.css'

const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const onSubmit = data => console.log(data);

    console.log(watch("example"));
    return (
        <div className="ship">
            <div className="container">
                <div className="col-md-6 mx-auto bg-white">
                    <div className="my-form">
                        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>

                            <input name="example" defaultValue="test" ref={register} />


                            <input name="exampleRequired" ref={register({ required: true })} />

                            {errors.exampleRequired && <span>This field is required</span>}

                            <input type="submit" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Shipment;