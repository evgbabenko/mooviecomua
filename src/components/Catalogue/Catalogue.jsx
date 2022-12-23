import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Card from '../Card/Card';
import { Service } from '../services/script';
import $ from 'jquery';

import './Catalogue.css'

function Catalogue() {
    const params = useParams();
    const [mooviesList, setMooviesList] = useState([]);
    const [genres, setGenres] = useState([]);
    const [currpage, setCurrpage] = useState((!params.page) ? 1 : params.page);
    const [list, setList] = useState(params.cat);

    useEffect(() => {
        $(window).scrollTop(0);
        if (list !== params.cat) {
            setMooviesList([]);
            setCurrpage(1);
        };
        setList(params.cat);
    }, [params.cat]);

    useEffect(() => {
        new Service().getData(list, currpage).then((data) => {
            const res = data.results;
            setMooviesList(res);
        })
        $(window).scrollTop(0);
    }, [currpage, list]);

    if (genres.length < 1) {
        new Service().getGenres().then((data) => {
            setGenres(data.genres);
        })
    }
    /*     console.log(mooviesList) */
    return (
        <section className="catalogue">
            <div className='catalogue-cards'>
                {mooviesList.map((item, index) => {
                    return <Card index={index} list={list} item={item} key={index*5-index}/>
                })}
            </div>
            <div className="pagination">
                <Link to={`/${params.cat}/${(currpage) > 1 ? Number(currpage) - 1 : 1}`}><div className={(currpage === 1) ? 'btn btn-disabled' : 'btn'} role='button' onClick={() => setCurrpage((currpage) > 1 ? Number(currpage) - 1 : 1)}>Попередня сторінка</div></Link>
                <Link to={`/${params.cat}/${Number(currpage) + 1}`}><div className='btn' role='button' onClick={() => setCurrpage(Number(currpage) + 1)}>Наступна сторінка</div></Link>
            </div>
        </section>
    )
}

export default Catalogue