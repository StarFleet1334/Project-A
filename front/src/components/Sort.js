import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'
import { useLanguageContext } from '../context/language_context'


const Sort = () => {
  const { filtered_products: products, grid_view, setGridView, setListView, sort, updateSort } = useFilterContext();

  const { items } = useLanguageContext();

  return (
    <Wrapper>
      <div className='btn-container'>
        <button type='button' className={`${grid_view ? 'active' : null}`} onClick={setGridView}><BsFillGridFill /></button>
        <button type='button' className={`${!grid_view ? 'active' : null}`} onClick={setListView}><BsList /></button>
      </div>
      <p>
        {products.length} {items.product_page.found_text}.
      </p>
      <hr />
      <form>
        <label htmlFor='sort'>{items.product_page.sort} </label>
        <select name='sort' id='sort' className='sort-input'
          value={sort}
          onChange={updateSort}
        >
          <option value='price-lowest'>{items.product_page.sort_lowest}</option>
          <option value='price-highest'>{items.product_page.sort_highest}</option>
          <option value='name-a'>{items.product_page.sort_az}</option>
          <option value='name-z'>{items.product_page.sort_za}</option>
        </select>
      </form>
    </Wrapper >
  )
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-primary-10);
      color: white;
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-white);
      color: var(--clr-black);
    }
  }
  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
  option {
    background-color: var(--clr-black);
    color: var(--clr-white)
  }
  select {
    background-color: var(--clr-black);
    color: var(--clr-white)
    border: none
    border-radius: 100px
  }
`

export default Sort