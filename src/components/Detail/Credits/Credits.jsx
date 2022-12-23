import React, { useState, useEffect } from 'react'
import { Service, getImage } from '../../services/script';
import { useParams } from "react-router-dom";

// import Swiper core and required modules
import { Pagination, FreeMode, Autoplay } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './Credits.css'

export default function Credits() {
    const params = useParams();
    const [credits, setCredits] = useState(null);
    useEffect(() => {
        new Service().getCredits((params.info === 'series') ? 'tv' : params.info, params.id).then((data) => {
            setCredits(data);
        })
    }, [params]);

    return (!credits) ? <></> : (
        <section className="credits">
            <div className='list-name'>
                <h3>Акторський склад</h3>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                modules={[FreeMode, Autoplay, Pagination]}
                pagination={{ clickable: true }}
                autoplay
                breakpoints={{
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {
                    credits['cast'].map((item, index) => {
                        return <SwiperSlide key={`${index * 4 + item.profile_path}`}>
                            <div className="credits-card">
                                <div className="credits-image-box">
                                    {(getImage(item.profile_path) === null) ? <img src={require('../../../assets/noimage.png')} alt={item.character} /> : <img src={getImage(item.profile_path)} alt={item.character} />}
                                </div>
                                <div className="credits-description">
                                    <p>
                                        Пересонаж: {item.character}
                                    </p>
                                    <p>
                                        Ім'я: {item.name}
                                    </p>
                                    <p>
                                        Стать: {(item.gender === 2) ? 'чоловік' : (item.gender === 1) ? 'жінка' : 'n/a'}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }

            </Swiper>

            <div className='list-name'>
                <h3>Знімальна група</h3>
            </div>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                modules={[FreeMode, Autoplay, Pagination]}
                autoplay
                pagination={{ clickable: true }}
                className="carousel-cards"
                breakpoints={{
                    1024: {
                        slidesPerView: 5,
                        spaceBetween: 20,
                    },
                }}
            >
                {
                    credits['crew'].map((item, index) => {
                        return (!item) ? <></> : <SwiperSlide key={`${index * 4 + item.profile_path}`}>

                            <div className="credits-card">
                                <div className="credits-image-box">
                                    {(getImage(item.profile_path) === null) ? <img src={require('../../../assets/noimage.png')} alt={item.character} /> : <img src={getImage(item.profile_path)} alt={item.character} />}
                                </div>
                                <div className="credits-description">
                                    <p>
                                        Ім'я: {item.name}
                                    </p>
                                    <p>
                                        Посада: {item.job}
                                    </p>
                                    <p>
                                        Департамент: {item.department}
                                    </p>
                                    <p>
                                        Стать: {(item.gender === 2) ? 'чоловік' : (item.gender === 1) ? 'жінка' : 'n/a'}
                                    </p>
                                </div>
                            </div>

                        </SwiperSlide>
                    })
                }

            </Swiper>
        </section>

        /* 
            <section className='flex text-center'>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCast" aria-expanded="false" aria-controls="collapseCast">Акторський состав</button>
                        </div>
                        <div className='col'>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCrew" aria-expanded="false" aria-controls="collapseCrew">Знімальна група</button>
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm">
                        <div className="collapse multi-collapse" id="collapseCast">
                            <div className="card-body">
                                {
                                    (
                                            credits['cast'].map((item, index) => {
                                                return <div className="clearfix m-3" key={index * 4 + item.profile_path}> <hr></hr>
                                                    {(getImage(item.profile_path) === null) ?
                                                        (<div className='col-md-6 float-md-start mb-3 ms-md-3 collection-poster-small'>
                                                            
                                                        </div>) :
                                                        <img className='col-md-6 float-md-start mb-3 ms-md-3 collection-poster-small rounded' src={getImage(item.profile_path)} alt={item.character} data-bs-toggle="modal" data-bs-target={`#castModal${index}`} />}
                                                    
                                                    <div className="modal fade" id={`castModal${index}`} tabIndex="-1" aria-labelledby={`castModalLabel${index}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-md-down bg-dark">
                                                            <div className="modal-content  bg-dark">
                                                                <div className="modal-header">
                                                                    {item.character} ({item.name})
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <img className='img-fluid poster-credits' data-bs-dismiss="modal" src={getImage(item.profile_path)} alt={item.character} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='pl-3'>
                                                        <p>
                                                            Пересонаж: {item.character}
                                                        </p>
                                                        <p>
                                                            Ім'я: {item.name}
                                                        </p>
                                                        <p>
                                                            Стать: {(item.gender === 2) ? 'чоловік' : (item.gender === 1) ? 'жінка' : 'n/a'}
                                                        </p>
                                                    </div>
                                            
                                                </div>
                                            }))
                                }
                            </div>
                        </div>
                    </div>

                    <div className="col">
                        <div className="collapse multi-collapse" id="collapseCrew">
                            <div className="card-body">
                                {
                                            credits['crew'].map((item, index) => {
                                                return <div className="clearfix m-3" key={index * 4 + item.profile_path}> <hr></hr>
                                                    {(getImage(item.profile_path) === null) ?
                                                        (<div className='col-md-6 float-md-start mb-3 ms-md-3 collection-poster-small'>
                                                            
                                                        </div>) :
                                                        <img className='col-md-6 float-md-start mb-3 ms-md-3 collection-poster-small rounded' src={getImage(item.profile_path)} alt={item.character} data-bs-toggle="modal" data-bs-target={`#castModal${index}`} />}
                                                   
                                                    <div className="modal fade" id={`castModal${index}`} tabIndex="-1" aria-labelledby={`castModalLabel${index}`} aria-hidden="true">
                                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-fullscreen-md-down bg-dark">
                                                            <div className="modal-content  bg-dark">
                                                                <div className="modal-header">
                                                                    {item.character} ({item.name})
                                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                                                </div>
                                                                <div className="modal-body">
                                                                    <img className='img-fluid poster-credits' data-bs-dismiss="modal" src={getImage(item.profile_path)} alt={item.character} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className='pl-3'>
                                                        <p>
                                                            Ім'я: {item.name}
                                                        </p>
                                                        <p>
                                                            Посада: {item.job}
                                                        </p>
                                                         <p>
                                                            Департамент: {item.department}  
                                                        </p>                                                       
                                                        <p>
                                                            Стать: {(item.gender === 2) ? 'чоловік' : (item.gender === 1) ? 'жінка' : 'n/a'}
                                                        </p>
                                                    </div>
                                            
                                                </div>
                                            })
                                }
                            </div>
                        </div>
                    </div>
                </div> 

            </section>*/

    )
}