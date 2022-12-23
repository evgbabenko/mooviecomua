import React, { useState } from 'react';
import { Link, useParams } from "react-router-dom";
import $ from 'jquery';

import './Nav.css';

function Nav() {
    const params = useParams();
    const [activeNav, setActiveNav] = useState('#');
    const [isMobile, setIsMobile] = useState(false);
    $(() => {
        ($(window).width() < 1000) ? setIsMobile(true) : setIsMobile(false);
        $(window).on('resize', () => {
            if ($(window).width() > 1000) {
                $('#menu').css('display', 'flex');
                $('#btn-menu').css('display', 'none');
                $('#btn-close').css('display', 'none');
                setIsMobile(false);
            }
            else if ($(window).width() < 1000) {
                $('#menu').css('display', 'none');
                $('#btn-menu').css('display', 'block');
                $('#btn-close').css('display', 'none');
                setIsMobile(true);
            }
        })

        $(window).on('scroll', () => {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > 100) {
                $('#nav').addClass('show-box-shadow');
            } else {
                $("#nav").removeClass('show-box-shadow');
            }
        })
    })

    const mobileOpen = () => {
        $('#menu').fadeIn();
        $('#btn-menu').css('display', 'none');
        $('#btn-close').css('display', 'block');
    }

    const mobileClose = () => {
        if (isMobile) {
            $('#menu').fadeOut();
            $('#btn-menu').css('display', 'block');
            $('#btn-close').css('display', 'none');
        }
    }
    return (
        <nav id="nav">
            <div className="container">
            <Link to='/' onClick={() => {setActiveNav('/'); mobileClose()}} className={(activeNav === '/')? 'active' : ''}><h3>MOOVIE</h3></Link>
                <ul id="menu">
                    <li><Link to="/" onClick={() => {setActiveNav('/'); mobileClose()}} className={(activeNav === '/')? 'active' : ''}>Головна</Link></li>
                    <li><Link to="/movie" onClick={() => {setActiveNav('movie'); mobileClose()}} className={(activeNav === 'movie')? 'active' : ''}>Фільми</Link></li>
                    <li><Link to="/series" onClick={() => {setActiveNav('series'); mobileClose()}} className={(activeNav === 'series') ? 'active' : ''}>Серіали</Link></li>
                    <li><Link to="/contacts" onClick={() => {setActiveNav('contacts'); mobileClose()}} className={(activeNav === 'contacts') ? 'active' : ''}>Зв'язок</Link></li>
{/*                     <li><a href="#" onClick={() => {setActiveNav('#'); mobileClose()}} className={activeNav === '' ? 'active' : ''}>Home</a></li>
                    <li><a href="#" onClick={() => {setActiveNav('#'); mobileClose()}} className={activeNav === '' ? 'active' : ''}>Home</a></li>
                    <li><a href="#" onClick={() => {setActiveNav('#'); mobileClose()}} className={activeNav === '' ? 'active' : ''}>Home</a></li> */}
                </ul>
                <button id='btn-menu' onClick={() => {
                    mobileOpen();
                }}><span className="material-symbols-outlined">menu</span></button>
                <button id='btn-close' onClick={() => {
                    mobileClose();
                }}><span className="material-symbols-outlined">close</span></button>
            </div>
        </nav >
    )
}

export default Nav