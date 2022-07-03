import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'
import { BsFacebook, BsTwitter, BsYoutube, BsInstagram } from 'react-icons/bs'
import '../App.css'
import { useLanguageContext } from '../context/language_context'


const AboutPage = () => {
  const { items } = useLanguageContext();

  return (
    <main>
      <PageHero title='about' />
      <Wrapper className='page section section-center'>
        <img src={aboutImg} alt='nice desk' />
        <article>
          <div className='title'>
            <h2>{items.about_page.story}</h2>
            <div className='underline'></div>
          </div>
          <p>
            {items.about_page.text}

          </p>

          <div className='react-icons'>
            <span className='icon' data-tooltip='Facebook'>
              <i><BsFacebook /></i>
            </span>
            <span className='icon' data-tooltip='Twitter'>
              <i><BsTwitter /></i>
            </span>
            <span className='icon' data-tooltip='Youtube'>
              <i><BsYoutube /></i>
            </span>
            <span className='icon' data-tooltip='Instagram'>
              <i><BsInstagram /></i>
            </span>
          </div>
        </article>
      </Wrapper>
    </main >
  )
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage