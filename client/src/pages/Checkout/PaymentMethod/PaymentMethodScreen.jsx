import React, { useState } from 'react';
import CheckoutSteps from '../../../components/CheckoutSteps/CheckoutSteps';
import "./PaymentMethodScreen.css";

export default function Paymentmethodscreen(){
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="PaymentMethod-form">
                <div>
                <h1>Payment Method</h1>
                </div>
                <div>
                <div>
                    <input
                    type="radio"
                    id="paypal"
                    value="PayPal"
                    name="paymentMethod"
                    required
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="paypal">PayPal</label>
                </div>
                </div>
                <div>
                <div>
                    <input
                    type="radio"
                    id="stripe"
                    value="Stripe"
                    name="paymentMethod"
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    ></input>
                    <label htmlFor="stripe">Stripe</label>
                </div>
                </div>
                <div>
                <label />
                <button className="PaymentMethod-primary" type="submit">
                    Continue
                </button>
                </div>
            </form>
        </div>
    );
}
