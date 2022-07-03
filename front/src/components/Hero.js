import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import heroBcg from '../assets/hero-bcg.jpeg'
import heroBcg2 from '../assets/hero-bcg-2.jpeg'
import second from '../assets/second_img.jpg'
import third from '../assets/third_image.jpg'
import fourth from '../assets/fourth_image.jpg'
import { useLanguageContext } from '../context/language_context'


const data = [
  {
    url: heroBcg
  },
  {
    url: second
  },
  {
    url: third
  },
  {
    url: fourth
  }
]

const Hero = () => {
  const { items } = useLanguageContext();

  return (
    <Wrapper className='section-center'>
      <article className='content'>
        <h1>
          {items.home_page.quote}
        </h1>
        <p>
          {items.home_page.first_quote}
        </p>
        <Link to='/products' className='btn hero-btn'>
          {items.home_page.shop}
        </Link>
      </article>
      <article className='img-container'>
        <img src={data[0].url} alt='nice' className='main-img' />
        <img src={heroBcg2} alt='person working' className='accent-img' />
      </article>
    </Wrapper >
  )
}

const Wrapper = styled.section`
  min-height: 60vh;
  display: grid;
  place-items: center;
  .img-container {
    display: none;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin-bottom: 2rem;
    color: #f1faee;
    font-size: 1rem;
  }
  @media (min-width: 992px) {
    height: calc(100vh - 5rem);
    grid-template-columns: 1fr 1fr;
    gap: 8rem;
    h1 {
      margin-bottom: 2rem;
    }
    p {
      font-size: 1.25rem;
    }
    .hero-btn {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
    }
    .img-container {
      display: block;
      position: relative;
    }
    .main-img {
      width: 100%;
      height: 550px;
      position: relative;
      border-radius: var(--radius);
      display: block;
      object-fit: cover;
    }
    .accent-img {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250px;
      transform: translateX(-50%);
      border-radius: var(--radius);
    }
    .img-container::before {
      content: '';
      position: absolute;
      width: 10%;
      height: 80%;
      background: var(--clr-primary-9);
      bottom: 0%;
      left: -8%;
      border-radius: var(--radius);
    }
  }
`

export default Hero