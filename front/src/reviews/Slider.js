import React, { useState, useEffect } from 'react';
import '../App.css'
import styled from 'styled-components'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';
import { FaQuoteRight } from 'react-icons/fa';
import data from './data';
import './helper.css'
import { useLanguageContext } from '../context/language_context';

const Slider = () => {
    const [people, setPeople] = useState(data);
    const [index, setIndex] = useState(0);
    const { items } = useLanguageContext();

    const nextSlide = () => {
        setIndex((oldIndex) => {
            let index = oldIndex + 1
            if (index > people.length - 1) {
                index = 0
            }
            return index
        })
    }
    const prevSlide = () => {
        setIndex((oldIndex) => {
            let index = oldIndex - 1
            if (index < 0) {
                index = people.length - 1
            }
            return index
        })
    }

    useEffect(() => {
        let slider = setInterval(() => {
            setIndex((oldIndex) => {
                let index = oldIndex + 1
                if (index > people.length - 1) {
                    index = 0
                }
                return index
            })
        }, 5000)
        return () => {
            clearInterval(slider)
        }
    }, [index])

    return (
        <Wrapper>
            <div className="title">
                <h2>
                    <span></span>{items.home_page.reviews}
                </h2>
            </div>
            <div className="section-center">
                {people.map((person, personIndex) => {
                    const { id, image, name, title, quote } = person

                    let position = 'nextSlide'
                    if (personIndex === index) {
                        position = 'activeSlide'
                    }
                    if (
                        personIndex === index - 1 ||
                        (index === 0 && personIndex === people.length - 1)
                    ) {
                        position = 'lastSlide'
                    }
                    console.log(`${title[0]}_quote`)

                    return (
                        <article className={position} key={id}>
                            <img src={image} alt={name} className='person-img' />
                            <h4>{name}</h4>
                            <p className='title'>{items.home_page[title[0]]}</p>
                            <p className='text'>{items.home_page[`${title[0]}_quote`]}</p>
                            <FaQuoteRight className='icon' />
                        </article>
                    )
                })}
                <button className="prev" onClick={prevSlide}>
                    <FiChevronLeft />
                </button>
                <button className="next" onClick={nextSlide}>
                    <FiChevronRight />
                </button>
            </div>
        </Wrapper >
    )
}

const Wrapper = styled.section`
    width: 90vw;
    margin: 5rem auto;
    max-width: 1170px;
    @media screen and (min-width: 992px) {
        section {
          width: 95vw;
        }
    }
    .title {
        text-align: center;
        margin-bottom: 2rem;
        height: 10px;
        h2 {
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 500;
            letter-spacing: 15px;
            span {
                font-size: 0.85em;
                color: hsl(21, 62%, 45%);
                margin-right: 1rem;
                font-weight: 700;
            }
        }
    }
    .section-center {
        margin: 0 auto;
        margin-top: 4rem;
        width: 80vw;
        height: 400px;
        max-width: 800px;
        text-align: center;
        position: relative;
        display: flex;
        overflow: hidden;
        article {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: all 0.3s linear;
            .person-img {
                border-radius: 50%;
                margin-bottom: 1rem;
                width: 150px;
                height: 150px;
                object-fit: cover;
                border: 4px solid hsl(210, 31%, 80%);
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            h4 {
                text-transform: uppercase;
                color:  hsl(21, 62%, 45%);
                margin-bottom: 0.25rem;
            }
            .title {
                text-transform: capitalize;
                margin-bottom: 0.75rem;
                color: hsl(209, 34%, 30%);
            }
            .text {
                max-width: 35em;
                margin: 0 auto;
                margin-top: 2rem;
                line-height: 2;
                color:  hsl(210, 22%, 49%);
            }
            .icon {
                font-size: 3rem;
                margin-top: 1rem;
                color:  hsl(21, 62%, 45%);
            }
        }
        article.activeSlide {
            opacity: 1;
            transform: translateX(0);
        }
        article.lastSlide {
            transform: translateX(-100%);
        }
        article.nextSlide {
            transform: translateX(100%);
        }
    }
`

export default Slider