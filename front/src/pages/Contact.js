import React, { useRef } from 'react';
import styled from 'styled-components'
import { PageHero } from '../components'
import emailjs from '@emailjs/browser';
import { useLanguageContext } from '../context/language_context';

const Contact = () => {
    const form = useRef();
    const { items } = useLanguageContext();


    const sendEmail = (e) => {
        e.preventDefault();
        if (e.target.name.value && e.target.email.value && e.target.message.value) {
            emailjs.sendForm('service_qwlluyy', 'template_pvy9xsy', form.current, '9jeOj26VaW2EpTthq')
                .then((result) => {
                    console.log(result.text);
                }, (error) => {
                    console.log(error.text);
                });
            e.target.reset();
        }
    };

    return (
        <>
            <PageHero title='contact' />
            <Wrapper>
                <div className="content">
                    <div className="left-side">
                        <div className="address details">
                            <i className="fas fa-map-marker-alt"></i>
                            <div className="topic">{items.contact_page.address}</div>
                            <div className="text-one">
                                Youth Avenue Lane 5/7 </div>
                            <div className="text-two">Kutaisi, 4600</div>
                        </div>
                        <div className="phone details">
                            <i className="fas fa-phone-alt"></i>
                            <div className="topic">{items.contact_page.phone}</div>
                            <div className="text-one">+995 593 13 81 31</div>
                            <div className="text-two">+995 551 15 30 90</div>
                        </div>
                        <div className="email details">
                            <i className="fas fa-envelope"></i>
                            <div className="topic">{items.contact_page.email}</div>
                            <div className="text-one">lataria.ila6@gmail.com</div>
                            <div className="text-two">penguins@gmail.com</div>
                        </div>
                    </div>
                    <div className="right-side">
                        <div className="topic-text">{items.contact_page.message}</div>
                        <p>{items.contact_page.text}</p>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="input-box">
                                <input type='text' placeholder={items.contact_page.name} name='name' required></input>
                            </div>
                            <div className="input-box">
                                <input type='text' placeholder={items.contact_page.mail} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" name='email' required></input>
                            </div>
                            <input className="input-box message-box" name='message' required>

                            </input>
                            <div className="button">
                                <input className='btn' type="submit" value={items.contact_page.send} />
                            </div>
                        </form>
                    </div>
                </div>
            </Wrapper>
        </>
    )
}

const Wrapper = styled.div`
        width: 100%;
        height: 510px;
        background: #212529;
        border-radius: 6px;
        padding: 20px 60px 30px 40px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

        .content {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left-side {
                width: 25%;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin-top: 15px;
                position: relative;

                .details {
                    margin: 14px;
                    text-align: center;

                    i {
                        font-size: 30px;
                        color: #463280;
                        margin-bottom: 10px;
                    }

                    .topic {
                        font-size: 18px;
                        font-weight: 500;
                    }

                    .text-one,
                    .text-two {
                        font-size: 14px;
                        color: #afafb6;
                    }
                }
            }
            

            // .left-side::before {
            //     content: '';
            //     position: absolute;
            //     height: 70%;
            //     width: 2px;
            //     right: -15px;
            //     top: 50%;
            //     transform: translateY(-50%);
            //     background: #afafb6;
            // }

            .rigth-side {
                width: 75%;
                margin-left: 75px;    
            }
            .topic-text {
                font-size: 23px;
                font-weight: 600;
                color: #red;
            }
            .input-box{
                height: 50px;
                width: 100%;
                margin: 12px 0;
            }

            input,
            textarea {
                height: 100%;
                width: 100%;
                border: none;
                outline: none;
                font-size: 16px;
                background: #F0F1F8;
                border-radius: 6px;
                padding: 0 15px;
                resize: none;
            }

            .message-box{
                min-height: 110px;
            }

            textarea{
                padding-top: 6px;
            }

            .btn {
                display: inline-block;
                margin-top: 12px;
                width: 50%;
            }

            input[type="submit"]{
                color: black;
                font-size: 18px;
                outline: none;
                border: none;
                padding: 8px 16px;
                border-radius: 6px;
                background: hsl(22, 31%, 88%);
                cursor: pointer;
                transition: all 0.3s ease;
            }
            input[type="submit"]:hover{
                background: #C9C5C3;
            }
        }

        @media (max-width: 950px) {
              width: 100%;
              padding: 30px 40px 40px 35px ;
            
              .content .right-side{
                    width: 75%;
                    margin-left: 55px;
               }
          }
        @media (max-width: 820px) {
            margin: 40px 0;
            height: 100%;
            
            .content{
              flex-direction: column-reverse;
            }
            .content .left-side{
             width: 100%;
             flex-direction: row;
             margin-top: 40px;
             justify-content: center;
             flex-wrap: wrap;
            }
            .content .left-side::before{
             display: none;
            }
            .content .right-side{
             width: 100%;
             margin-left: 0;
            }
        }

`

export default Contact