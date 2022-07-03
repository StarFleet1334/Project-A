import React, { useState } from 'react'

import {
    CardElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import "../App.css"
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { useNavigate } from "react-router-dom";



const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            color: "fff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI,sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}


const PaymentForm = () => {
    const [success, setSuccess] = useState(false);
    const stripe = useStripe()
    const { cart, total_amount, shipping_fee, clearCart } = useCartContext()
    const { reg_user } = useUserContext()
    const elements = useElements()
    const [processing, setProcessing] = useState('')
    let navigate = useNavigate();

    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setProcessing(true)
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement)
        })

        if (!error) {
            try {
                const { id } = paymentMethod
                let amount = total_amount
                const response = await axios.post(`http://localhost:4000/payment/${amount}/${id}`)

                if (response.data.success) {
                    console.log("Successfully payed.")
                    setProcessing(false)
                    setError(null)
                    setSuccess(true);

                    setTimeout(() => {
                        clearCart()
                        navigate('/', { replace: true })
                    }, 4000)

                    console.log(reg_user)

                    await axios.post(`http://localhost:4000/good/${reg_user.email}`)
                        .then((data) => console.log(data))
                        .then((response) => console.log(response))
                }


            } catch (err) {
                console.log("Error", err)
                setProcessing(false)
                setError("Payment Failed")

            }
        } else {
            console.log(error.message)
            setError()
        }
    }


    return (
        <>
            {!success ?
                <div className='forum'>
                    <article>
                        <h4>Hello, {reg_user && reg_user.nickname}</h4>
                        <p>Your total is {formatPrice(shipping_fee + total_amount)}</p>
                        <p>Test Card Number : 4242 4242 4242 4242</p>
                    </article>
                    <form onSubmit={handleSubmit} className='payForm'>

                        <fieldset className='FormGroup'>
                            <div className='FormRow'>
                                <CardElement options={CARD_OPTIONS} />
                            </div>
                        </fieldset>
                        <button className="pay">
                            <span id='button-text'>
                                {processing ? <div className='spinner' id='spinnier'></div> : 'Pay'}
                            </span>
                        </button>
                        {error && (
                            <div className='card-error' role='alert'>
                                {error}
                            </div>
                        )}
                    </form>
                </div>
                :
                <div>
                    <article>
                        <h4>Thank you</h4>
                        <h4>Your payment was successful!</h4>
                        <h4>Redirecting to home page shortly</h4>
                    </article>
                </div>
            }
        </>
    )
}

export default PaymentForm