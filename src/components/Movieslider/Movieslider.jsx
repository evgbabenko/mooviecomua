import React, { useState, useEffect } from 'react';
import { Service } from '../services/script';
// import required modules
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Autoplay } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/autoplay';
import "swiper/css/effect-fade";

import './Movieslider.css'
import Card from '../Card/Card';

function MovieSlider({ list }) {
    const [movieData, setMovieData] = useState([]);
    if (list == null || list.length < 1) { list = 'movie' };
    useEffect(() => {
        new Service().getData(list, 1).then((data) => {
            setMovieData(data.results);
        })
    }, []);
    const rand = () => { return Math.floor(Math.random() * 10) }
    let catTitle = '';
    switch (list) {
        case 'movie': catTitle = 'Фільми';
            break
        case 'series': catTitle = 'Серіали';
            break
        case 'new': catTitle = 'Новинки й популярне';
            break
        default: catTitle = '';
    }

    return (
        <section className='movieslider'>
            <div className="container">
                <h4>{catTitle}</h4>
                <div >
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        modules={[FreeMode, Autoplay]}
                        autoplay={{
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,}
                        }
                    className="carousel-cards"
                    breakpoints={{
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 50,
                        },
                    }}
                    >
                    {movieData.map((item, id) => {
                        return (
                            <SwiperSlide key={`desc-${id + rand()}${item.backdrop_path}${item.original_title}`}>

                                <Card index={id} list={(list === 'new') ? item.media_type : list} item={item} key={id * 5 - id} />

                            </SwiperSlide>
                        )
                    })
                    }
                </Swiper>
            </div>

        </div>
        </section >
    )
}

export default MovieSlider