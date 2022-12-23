import React from 'react';
import MovieSlider from '../Movieslider/Movieslider';

import './Header.css'

function Header
    () {
    return (
        <section className='header'>
            <MovieSlider list='' />
            <MovieSlider list='series' />
            <MovieSlider list='new' />
        </section>
    )
}

export default Header
