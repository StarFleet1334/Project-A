import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'
import { useLanguageContext } from '../context/language_context'


const Filters = () => {
  const {
    filters: {
      text, category, company, color, min_price, max_price, price, shipping
    },
    updateFilters,
    clearFilters,
    all_products
  } = useFilterContext()
  const { items } = useLanguageContext();

  const categories = getUniqueValues(all_products, 'category');
  const companies = getUniqueValues(all_products, 'company');
  const colors = getUniqueValues(all_products, 'colors');



  return (
    <Wrapper>
      <div className='content'>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className='form-control'>
            <input type='text' name='text' placeholder={items.product_page.search} className='search-input'
              value={text}
              onChange={updateFilters}
            />
          </div>

          <div className='form-control'>
            <h5>{items.product_page.category}</h5>
            <div>
              {categories.map((c, index) => {

                let engVersion = 'All'
                if (category === 'Todos') {
                  engVersion = 'All'
                }
                else if (category === 'Oficina') {
                  engVersion = 'Office'
                } else if (category === 'Sala de estar') {
                  engVersion = 'Living Room'
                } else if (category === 'Cocina') {
                  engVersion = 'Kitchen'
                } else if (category === 'Comida') {
                  engVersion = 'Dining'
                } else if (category === 'niñas') {
                  engVersion = 'kids'
                } else if (category === 'Dormitorio') {
                  engVersion = 'Bedroom';
                } else {
                  engVersion = category
                }


                return <button key={index}
                  onClick={updateFilters}
                  name='category'
                  type='button'
                  className={`${engVersion.toLowerCase() === c.toLowerCase() ? 'active' : null}`}
                >{c === 'living room' ? items.product_page.living : items.product_page[c]}</button>
              })}
            </div>
          </div>

          <div className='form-control'>
            <h5>{items.product_page.company}</h5>
            <select name='company' value={company} onChange={updateFilters} className='company'>
              {companies.map((c, index) => {
                return <option key={index} value={c}>{c}</option>
              })}
            </select>
          </div>

          <div className='form-control'>
            <h5>{items.product_page.colors}</h5>
            <div className='colors'>
              {
                colors.map((c, index) => {
                  if (c === 'all') {
                    return <button name='color' onClick={updateFilters} data-color='all' key={index}
                      className={`${color === 'all' ? 'all-btn active' : 'all-btn'}`}
                    >
                      {items.product_page.all}
                    </button>
                  } else {
                    return <button key={index} name='color' style={{ background: c }}
                      className={`${color === c ? 'color-btn active' : 'color-btn'}`}
                      data-color={c} onClick={updateFilters}
                    >{color === c ? <FaCheck /> : null}</button>
                  }

                })
              }
            </div>
          </div>

          <div className='form-control'>
            <h5>{items.product_page.price}</h5>
            <p className='price'>{formatPrice(price)}</p>
            <input
              type='range'
              name='price'
              onChange={updateFilters}
              min={min_price}
              max={max_price}
              value={price}
            />
          </div>

          <div className='form-control shipping'>
            <label htmlFor='shipping'>{items.product_page.shipping}</label>
            <input type='checkbox' name='shipping' id='shipping' onClick={updateFilters} checked={shipping} />
          </div>
        </form>
        <button type='button' className='clear-btn' onClick={clearFilters}>{' '} {items.product_page.clear_filters}</button>
      </div >
    </Wrapper >
  )
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
    select {
      background: var(--clr-grey-5);
    }
    input[type=range] {
      -webkit-appearance: none;
      margin: 20px 0;
      width: 100px;
    }
    input[type=range]:focus {
      outline: none;
    }
    input[type=range]::-webkit-slider-runnable-track {
      width: 100%;
      height: 4px;
      cursor: pointer;
      animate: 0.2s;
      background: #03a9f4;
      border-radius: 25px;
    }
    input[type=range]::-webkit-slider-thumb {
      height: 20px;
      width: 20px;
      border-radius: 50%;
      background: var(--clr-primary-10);
      box-shadow: 0 0 4px 0 rgba(0,0,0, 1);
      cursor: pointer;
      -webkit-appearance: none;
      margin-top: -8px;
    }
    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #03a9f4;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }
  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters