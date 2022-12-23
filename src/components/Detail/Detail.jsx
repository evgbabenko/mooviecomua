import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { Service, getImage } from '../services/script';
import ReactPlayer from 'react-player/youtube'
import Film from './Film/Film';
import $ from 'jquery';
import './Details.css'

export default function Detail() {

    const params = useParams();
    const [details, setDetails] = useState(null);
    const [videoURL, setVideoURL] = useState(null)

    const handleEnded = () => {
        $('#videofr').css('animation', 'fadeOut 3s');
        setTimeout(() => { $('#player').fadeOut() }, 3000);
        /* $('#details-info').offset({top: 80}) */
    }
    const handleError = () => {
        $('#videofr').fadeOut();
        /*    $('#details-info').offset({top: 80}) */
    }

    useEffect(() => {
        /* (params.info === 'new') ? 'movie':'tv' */
        new Service().getDetails(/* params.info */(params.info === 'series') ? 'tv' : params.info, params.id).then((data) => {
            setDetails(data);
            new Service().getVideo(/* params.info */(params.info === 'series') ? 'tv' : params.info, params.id).then((url) => {
                setVideoURL(url);
            })
        })
    }, [params]);

    $(() => {
        $(window).scrollTop(0);
        if (details) {
            $('#details').css('background-image', `url(${getImage(details.backdrop_path)})`);

        }
        if (videoURL) {
            $('#videofr').css('animation', 'fadeIn 3s');
        }
        setTimeout(() => {
            $('#mouse').css('animation', 'fadeIn 5s');
            $('#mouse').css('opacity', '1');
        }, 4000);
    })
    return (
        <>
            <section className='details' id='details'>
                <div className="field" id='mouse'>
                    <div className="mouse"></div>
                </div>
                {(videoURL) ?
                    (<div className='videofr' id='videofr'>
                        <ReactPlayer id='player'
                            className='react-player'
                            url={videoURL}
                            config={{ youtube: { playerVars: { showinfo: 0 } } }}
                            onEnded={handleEnded}
                            onError={handleError}
                            width='100%'
                            height='100%'
                            playing
                        />
                        <div id='player-title' className='details-title animate__animated animate__fadeInDownBig animate__delay-2s'>
                            {(details.title) ?
                                <h3>
                                    {details.title}
                                </h3>
                                : <h3>
                                    {details.original_title}
                                </h3>
                            }</div>
                    </div>) :
                    (<></>)}
            </section>
            <Film />
        </>
    )
}