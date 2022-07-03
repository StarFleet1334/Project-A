import React from 'react'
import { FaShoppingCart, FaUserMinus, FaUserPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { useLanguageContext } from '../context/language_context'
import '../App.css'
import { RiLinksFill } from 'react-icons/ri'
import { US, ES } from 'country-flag-icons/react/3x2'

const CartButtons = () => {
  const { closeSidebar } = useProductsContext();
  const { total_items, clearCart } = useCartContext();
  const { loginWithRedirect, reg_user, logout } = useUserContext();
  const { items, changeLang } = useLanguageContext();

  return (
    <Wrapper className='cart-btn-wrapper'>
      <Link to='/cart' className='cart-btn' onClick={closeSidebar}>
        <span className='cart-container'>
          {items.home_page.cart} <FaShoppingCart />
          <span className='cart-value'>{total_items}</span>
        </span>
      </Link>
      {reg_user ? <button type='button' className='auth-btn' onClick={() => {
        clearCart()
        logout({
          returnTo: window.location.origin
        })
      }}>
        {items.home_page.logout} <FaUserMinus />
      </button> : <button type='button' className='auth-btn' onClick={loginWithRedirect}>
        {items.home_page.login} <FaUserPlus />
      </button>}
      <div className='dropdown'>
        <span className='label'><i className='fa-solid'><RiLinksFill /></i>Language</span>
        <ul className='items'>
          <li onClick={() => changeLang('spanish')}><a href='' className='fa-brands'><ES /></a>spanish</li>
          <li onClick={() => changeLang('english')}><a href='' className='fa-brands'><US /></a>english</li>
        </ul>
      </div>

    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  width: 225px;
  .cart-btn {
    font-size: 1.5rem;
    letter-spacing: var(--spacing);
    // color: hsl(22, 28%, 21%);
    color: #adb5bd;
    text-decoration:none;
    display: flex;
    align-items: center;
  }
  .cart-container {
    display: flex;
    align-items: center;
    position: relative;
    svg {
      height: 1.6rem;
      margin-left: 5px;
    }
  }
  .cart-value {
    position: absolute;
    top: -13px;
    right: -13px;
    background: hsl(22, 31%, 52%);
    width: 2px;
    height: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    font-size: 0.75rem;
    color: #fff;
    padding: 12px;
  }
  .auth-btn {
    display: flex;
    align-items: center;
    background: transparent;
    border-color: transparent;
    font-size: 1.5rem;
    cursor: pointer;
    // color: hsl(22, 28%, 21%);
    color: #adb5bd;
    letter-spacing: 0.1rem;
    svg {
      margin-left: 5px;
    }
  }
`
export default CartButtons