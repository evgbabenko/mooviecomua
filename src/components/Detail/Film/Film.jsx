import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Service, getImage, toDate, langChanger } from '../../services/script';

import Credits from '../Credits/Credits';
import Genres from '../../Card/Genres/Genres';
import './Film.css'

export default function Film() {

    const params = useParams();
    const [details, setDetails] = useState(null);

    useEffect(() => {
        /* (params.info === 'new') ? 'movie':'tv' */
        new Service().getDetails((params.info === 'series') ? 'tv' : params.info, params.id).then((data) => {
            setDetails(data);
        })
    }, [params]);
    /* console.log(details) */  
    return (!details) ? <></> : (
        <section className="filmbox">
            <div className="info-box">
                <img src={getImage(details.poster_path)} alt={details.original_title} />
                <div className="movie-details">
                    <div className='movie-title'>
                        <h3>{(details.title) ? <>{details.title}</> 
                             :(details.name)? <>{details.name}</> 
                             :(details.original_name) ? <>{details.original_name}</>
                             :<>{details.original_title}</>}</h3>
                    </div>
                    <div className='movie-genres'>
                        {(details.genres) ?
                            <Genres list={details.genres} detailed={true}/>
                            :
                            <></>}
                    </div>
                    {(params.info === 'series' || params.info === 'tv') ? <></> :
                        <div className='movie-release-date'>
                            Дата релізу:&nbsp; {toDate(details.release_date)}
                        </div>
                    }
                    <div className='movie-rating'>
                        Рейтинг:&nbsp; {details.vote_average} ({details.vote_count})
                    </div>
                    <div className='movie-runtime'>
                        Тривалість, хв:&nbsp; {details.runtime}
                    </div>

                    <div className="movie-production-companies">
                        {
                            (details.production_companies) ?
                                <><div className='m-2'>Сиудії:&nbsp;
                                    {details.production_companies.map((item) => {
                                        return `${item.name}`;
                                    }).join(', ')}
                                </div>  </> :
                                <></>
                        }
                    </div>
                    <div className="movie-production-countries">
                        {
                            (details.production_countries) ?
                                <><div className='m-2'>Місця зйомки:&nbsp;
                                    {details.production_countries.map((item) => {
                                        return `${item.name}`;
                                    }).join(', ')}
                                </div>  </> :
                                <></>
                        }
                    </div>
                    <div className="movie-original-language">
                        {
                            (details.original_language) ?
                                <><div className='m-2'>Мова оригіналу:&nbsp;
                                    {langChanger(details.original_language)}
                                </div>  </> :
                                <></>
                        }
                    </div>
                    <div className="movie-spoken-language">
                        {
                            (details.spoken_languages) ?
                                <><div className='m-2'>Мови:&nbsp;
                                    {
                                        details.spoken_languages.map((lang) => {
                                            return langChanger(lang.iso_639_1)
                                        }).join(', ')
                                    }
                                </div>  </> :
                                <></>
                        }
                    </div>

                    <div className="movie-overview">
                        {details.overview}
                    </div>

                </div>
            </div>
{/*             {(details.belongs_to_collection) ?
                <><div className='pt-2 belongs_to_collection'>Належить до циклу:&nbsp;
                    {details.belongs_to_collection.name}
                     <div>
                        <img className='img-fluid rounded m-3 collection-poster-small' src={getImage(details.belongs_to_collection.poster_path)} alt={details.original_title} data-bs-toggle="modal" data-bs-target="#posterModal1" />

                        <div className="modal fade" id="posterModal1" tabIndex="-1" aria-labelledby="ModalLabel1" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl bg-dark">
                                <div className="modal-content  bg-dark">
                                    <div className="modal-header">
                                        {details.belongs_to_collection.name}
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                    </div>
                                    <div className="modal-body">
                                        <img className='img-fluid poster' data-bs-dismiss="modal" src={getImage(details.belongs_to_collection.poster_path)} alt={details.belongs_to_collection.name} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>  </> : <></>} */}
            <Credits />
        </section >
        /*             <>
                        <div className='container-fluid'>
                            <div className='row'>
                               
                                <div className='col-sm-3'>
                                    <img className='img-fluid rounded float-md-start mt-3 poster-small' src={getImage(details.poster_path)} alt={details.original_title} data-bs-toggle="modal" data-bs-target="#posterModal" />
                                    
                            
                                    <div className="modal fade" id="posterModal" tabIndex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl bg-dark">
                                            <div className="modal-content bg-dark">
                                                <div className="modal-header">
                                                    {(details.title) ? <>{details.title}</> : <>{details.original_title}</>}
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <img className='img-fluid poster' data-bs-dismiss="modal" src={getImage(details.poster_path)} alt={details.original_title} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
        
                                   
                                    {(details.belongs_to_collection) ?
                                    <><div className='pt-2 belongs_to_collection'>Належить до циклу:&nbsp;
                                        {details.belongs_to_collection.name}
                                        <div>
                                            <img className='img-fluid rounded m-3 collection-poster-small' src={getImage(details.belongs_to_collection.poster_path)} alt={details.original_title} data-bs-toggle="modal" data-bs-target="#posterModal1" />
                                           
                                            <div className="modal fade" id="posterModal1" tabIndex="-1" aria-labelledby="ModalLabel1" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl bg-dark">
                                                    <div className="modal-content  bg-dark">
                                                        <div className="modal-header">
                                                            {details.belongs_to_collection.name}
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                                                        </div>
                                                        <div className="modal-body">
                                                            <img className='img-fluid poster' data-bs-dismiss="modal" src={getImage(details.belongs_to_collection.poster_path)} alt={details.belongs_to_collection.name} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>  </>
                                    :
                                    <></>
                                }
        
                                </div>
                                <div className='col-sm-9'>
        
                                    <div className="details-title1">
                                        {(details.title) ? <>{details.title}</> : <>{details.original_title}</>}
                                    </div>
                                    <div className='m-2'>
                                        Дата релізу:&nbsp; {toDate(details.release_date)}
                                    </div>
                                    <div className='m-2'>
                                        Бюджет:&nbsp; {details.budget}
                                    </div>
                                    <div className='m-2'>
                                        Рейтинг:&nbsp; {details.vote_average} ({details.vote_count})
                                    </div>
                                    <div className='m-2'>
                                        Тривалість, хв:&nbsp; {details.runtime}
                                    </div>
                                    {
                                        (details.genres) ?
                                            <><div className='m-2'>
                                                Жанри:&nbsp;
                                                {details.genres.map((item) => {
                                                    return `${item.name}`;
                                                }).join(', ')}
                                            </div> </> :
                                            <></>
                                    }
                                
                                    {
                                        (details.production_companies) ?
                                            <><div className='m-2'>Сиудії:&nbsp;
                                                {details.production_companies.map((item) => {
                                                    return `${item.name}`;
                                                }).join(', ')}
                                            </div>  </> :
                                            <></>
                                    }
                                                      
                                    {
                                        (details.production_countries) ?
                                            <><div className='m-2'>Місця зйомки:&nbsp;
                                                {details.production_countries.map((item) => {
                                                    return `${item.name}`;
                                                }).join(', ')}
                                            </div>  </> :
                                            <></>
                                    }
        
                                    {
                                        (details.original_language) ?
                                            <><div className='m-2'>Мова оригіналу:&nbsp;
                                                {langChanger(details.original_language)}
                                            </div>  </> :
                                            <></>
                                    }
        
                                    {
                                        (details.spoken_languages) ?
                                            <><div className='m-2'>Мови:&nbsp;
                                                {
                                                    details.spoken_languages.map((lang) => {
                                                        return langChanger(lang.iso_639_1)
                                                    }).join(', ')
                                                }
                                            </div>  </> :
                                            <></>
                                    }
                                    <div className="p-2">
                                        {details.overview}
                                    </div>
                                    <Credits />
                                </div>
                            </div>
                        </div> 
                            
                    </> */
    )
}