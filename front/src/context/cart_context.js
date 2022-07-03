import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
    CLEAR_CART,
    COUNT_CART_TOTALS,
} from '../action'
import { useUserContext } from './user_context'
import axios from 'axios'

const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(localStorage.getItem('cart'));
    } else {
        return []
    }
}


const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { reg_user, count } = useUserContext();


    const addIntoCart = async (id, color, amount, product) => {
        // await axios.post(`http:localhost:4000/add/${reg_user.email}`, {
        //     ...product
        // })
        dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } })
        await axios.post(`http://localhost:4000/add/${reg_user.email}/${amount}`, {
            ...product
        })
            .then((data) => console.log(data))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        dispatch({ type: COUNT_CART_TOTALS })
        localStorage.setItem('cart', JSON.stringify(state.cart))
    }, [state.cart])

    const removeItem = async (id) => {
        dispatch({ type: REMOVE_CART_ITEM, payload: id })
        await axios.post(`http://localhost:4000/remove/${reg_user.email}/${id}`)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }



    const toggleAmount = async (id, value) => {
        dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
    }

    const clearCart = async () => {
        dispatch({ type: CLEAR_CART });
        await axios.post(`http://localhost:4000/clear/${reg_user.email}`)
            .then((data) => console.log(data))
            .catch((err) => console.log(err));
    }

    return (
        <CartContext.Provider value={{ ...state, addIntoCart, removeItem, toggleAmount, clearCart }}>

            {children}</CartContext.Provider>
    )
}
// make sure use
export const useCartContext = () => {
    return useContext(CartContext)
}