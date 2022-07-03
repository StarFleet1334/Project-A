import React from 'react'
import styled from 'styled-components'
import logo from '../assets/logo.svg'
import { FaBars } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { links } from '../utils/constants'
import CartButtons from './CartButtons'
import { useProductsContext } from '../context/products_context'
import { useUserContext } from '../context/user_context'
import interior from '../assets/interier.png'
import { useLanguageContext } from '../context/language_context'

const Nav = () => {
  const { openSidebar } = useProductsContext();
  const { items } = useLanguageContext();
  const { reg_user } = useUserContext();



  return (
    <NavContainer>
      <div className='nav-center'>
        <div className='nav-header'>
          <Link to='/'>
            <img src={interior}></img>
          </Link>
          <button type='button' className='nav-toggle' onClick={openSidebar}><FaBars /></button>
        </div>
        <ul className='nav-links'>
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{items.home_page[text]}</Link>
              </li>
            )
          })}
          {reg_user && <li><Link to='/checkout'>{items.home_page.checkout}</Link></li>}
        </ul>
        <CartButtons />
      </div>
    </NavContainer>
  )
}

const NavContainer = styled.nav`
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  .nav-center {
    width: 90vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .nav-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      width: 175px;
      margin-left: -14px;
      margin-top: 30px;
    }
  }
  .nav-toggle {
    background: transparent;
    border: transparent;
    color: hsl(22, 31%, 52%);
    cursor: pointer;
    svg {
      font-size: 2rem;
    }
  }
  .nav-links {
    display: none;
  }
  .cart-btn-wrapper {
    display: none;
  }
  @media (min-width: 992px) {
    .nav-toggle {
      display: none;
    }
    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr auto;
      align-items: center;
    }
    .nav-links {
      display: flex;
      justify-content: center;
      li {
        margin: 0 0.5rem;
        list-style: none;
      }
      a { 
        // color: hsl(209, 34%, 30%);
        color: #adb5bd;
        font-size: 1rem;
        text-transform: capitalize;
        text-decoration: none;
        letter-spacing:0.1rem;
        padding: 0.5rem;
        &:hover {
          border-bottom: 2px solid hsl(22, 31%, 67%);
        }
      }
    }
    .cart-btn-wrapper {
      display: grid;
    }
  }
`

export default Nav