import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import $ from 'jquery';
import './Contact.css'
/* import About from '../about/about'; */

const Contact = () => {

    $(() => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const useremail = document.querySelector('#useremail');
        const username = document.querySelector('#username');
        const sendbtn = document.querySelector('#sendbtn');
        let errorname = false;
        let errormail = false;
        sendbtn.addEventListener('click', () => {
            if (!useremail.value.match(validRegex) || useremail.value.length < 1) {
                $('#useremail').addClass('alertfield');
                $('#emailalert').fadeIn();
                $('#contact').addClass('animate__animated animate__shakeX')
                errormail = true;
            }
            if (username.value.length < 3) {
                $('#username').addClass('alertfield');
                $('#namealert').fadeIn();
                errorname = true;
            }
            useremail.addEventListener('focus', () => {
                if (errormail) {
                    $('#emailalert').fadeOut();
                    $('#useremail').removeClass('alertfield');
                    $('#contact').removeClass('animate__animated animate__shakeX')
                    errormail = false;
                }
            })
            username.addEventListener('focus', () => {
                if (errorname) {
                    $('#namealert').fadeOut();
                    $('#username').removeClass('alertfield');
                    $('#contact').removeClass('animate__animated animate__shakeX')
                    errorname = false;
                }
            })
        })
    })

    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_pk52dzi', 'template_pla10qp', form.current, 'p84uLNQjr2jAArLBi').then((result) => {
            $('#message-box').html('Message sent successfully');
            $('#message-box').addClass('success');
            e.target.reset();
            setTimeout(() => { $('#message-box').html(''); }, 5000)
        }, (error) => {
            $('#message-box').html(`Error: ${error.text}`);
            $('#message-box').addClass('error');
        });
    }
    return (
        <section className="contact" id='contact'>
            <div className="overlay">
                <div className="container">
                    <h1>Зв'язок</h1>
                    <p>Будь ласка, зв'яжіться з нами з будь-яких питань'</p>
                    <form ref={form} onSubmit={sendEmail}>
                        <input type="text" name="name" id="mane" placeholder="Ваше ім'я" required />
                        <input type="email" name='email' id='email' placeholder='Ваш Email' required />
                        <textarea name="message" id="message" rows="7" placeholder="Ваше повідомлення" required></textarea>
                        <div className='message-box' id='message-box'> </div>
                        <button type='submit' className="btn">Відправити</button>
                    </form>
                </div>
            </div>
        </section>
    )

}
export default Contact;