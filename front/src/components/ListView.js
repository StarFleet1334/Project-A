import React from 'react'
import styled from 'styled-components'
import { formatPrice } from '../utils/helpers'
import { Link } from 'react-router-dom'
import { useLanguageContext } from '../context/language_context'

const ListView = ({ products }) => {
  console.log(products)

  const { items } = useLanguageContext();

  return (
    <Wrapper>
      {products.map((product) => {
        const { id, image, name, price, description } = product
        return (
          <article key={id}>
            <img src={image} alt={name} />
            <div>
              <h4>{items.product_page.products[id].name}</h4>
              <h5 className='price'>{formatPrice(price)}</h5>
              <p>{items.product_page.products[id].text}</p>
              <Link to={`/products/${id}`} className='btn'>{items.product_page.detail}</Link>
            </div>
          </article>
        )
      })}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: grid;
  row-gap: 3rem;
  img {
    width: 100%;
    display: block;
    width: 300px;
    height: 200px;
    object-fit: cover;
    border-radius: var(--radius);
    margin-bottom: 1rem;
  }
  h4 {
    margin-bottom: 0.5rem;
  }
  .price {
    color: var(--clr-primary-6);
    margin-bottom: 0.75rem;
  }
  p {
    max-width: 45em;
    margin-bottom: 1rem;
  }
  .btn {
    font-size: 0.5rem;
    padding: 0.25rem 0.5rem;
  }
  @media (min-width: 992px) {
    article {
      display: grid;
      grid-template-columns: auto 1fr;
      column-gap: 2rem;
      align-items: center;
    }
  }
`

export default ListView