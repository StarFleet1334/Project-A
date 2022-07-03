import axios from 'axios';
import { toast } from 'react-toastify';
import {
    ADD_TO_CART,
    CLEAR_CART,
    COUNT_CART_TOTALS,
    REMOVE_CART_ITEM,
    TOGGLE_CART_ITEM_AMOUNT,
} from '../action'




const cart_reducer = (state, action) => {


    if (action.type === ADD_TO_CART) {
        const { id, color, amount, product } = action.payload;
        const temp = state.cart.find((item) => item.id === id + color)
        if (temp) {
            const tempCart = state.cart.map(((item) => {
                if (item.id === id + color) {
                    let newAmount = item.amount + amount;
                    if (newAmount > item.max) {
                        newAmount = item.max
                    }
                    return { ...item, amount: newAmount }
                } else {
                    return item
                }
            }))
            return { ...state, cart: tempCart }
        } else {
            const newItem = {
                id: id + color,
                name: product.name,
                color: color,
                amount: amount,
                image: product.images[0].url,
                price: product.price,
                max: product.stock
            }
            return { ...state, cart: [...state.cart, newItem] }
        }
    }

    if (action.type === REMOVE_CART_ITEM) {
        const temp = state.cart.filter((item) => item.id !== action.payload)
        return { ...state, cart: temp }
    }

    if (action.type === CLEAR_CART) {
        return { ...state, cart: [] }
    }

    if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
        const { id, value } = action.payload
        const tempCart = state.cart.map((item) => {
            if (item.id === id) {
                if (value === 'inc') {
                    let newAmount = item.amount + 1
                    if (newAmount > item.max) {
                        newAmount = item.max
                    }

                    return { ...item, amount: newAmount }
                }
                if (value === 'dec') {
                    let newAmount = item.amount - 1
                    if (newAmount < 1) {
                        newAmount = 1
                    }

                    return { ...item, amount: newAmount }
                }
            }
            return item
        })

        return { ...state, cart: tempCart }
    }

    if (action.type === COUNT_CART_TOTALS) {
        const { total_items, total_amount } = state.cart.reduce(
            (total, cartItem) => {
                const { amount, price } = cartItem

                total.total_items += amount
                total.total_amount += price * amount
                return total
            },
            {
                total_items: 0,
                total_amount: 0,
            }
        )
        return { ...state, total_items, total_amount }
    }

    return state
    throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer