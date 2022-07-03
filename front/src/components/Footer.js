import React from 'react'
import styled from 'styled-components'
import { useLanguageContext } from '../context/language_context'

const Footer = () => {
  const { items } = useLanguageContext();

  return (
    <Wrapper>
      <h5>
        &copy; {new Date().getFullYear()}
        <span> Rochester  --Interiors--</span>
      </h5>
      <h5>{items.home_page.rights}</h5>
    </Wrapper>
  )
}

const Wrapper = styled.footer`
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #222;
  text-align: center;
  span {
    color: hsl(22, 31%, 52%);
  }
  h5 {
    color: #fff;
    margin: 0.1rem;
    font-weight: 400;
    text-transform: none;
    line-height: 1.25;
  }
  @media (min-width: 776px) {
    flex-direction: row;
  }
`

export default Footer