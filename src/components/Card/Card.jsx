import React from 'react';
import { Link } from "react-router-dom";
import Genres from './Genres/Genres';
import { getImage, toDate } from '../services/script';
import css from './Card.module.css';

const Card = (props) => {
  
  const rand = () => { return Math.floor(Math.random() * 10) };
  const index = props.index;
  const list = props.list;
  const item = props.item;

  const limitStr = (str, n, symb) =>{
    if (!n && !symb) return str;
    symb = symb || '...';
    return str.substr(0, n - symb.length) + symb;
  }

  return (
    <Link to={`/info/${list}/${item.id}`}><div role='button' className={css.catalogue_card} key={`list-${index * rand()}${item.id * rand()}${item.backdrop_path}`}>
      <div className={css.flip_card_inner}>
        <div className={css.flip_card_front}>
          <div className={css.flip_img}>
            <img alt={item.original_title} src={getImage(item.poster_path)} />
          </div>
        </div>
        <div className={css.flip_card_back}>
          <h3 className={css.catalogut_title}>{(list === 'movie') ? item.title : (list === 'series') ? item.name : ''}</h3>
          <div className={css.overview}>{limitStr(item.overview,300,'...')}</div>
          {(list === 'movies') ? <p>Дата релизу: <span className={css.rating}>{toDate(item.release_date)}</span></p> : ''}
          <p><span className={css.rating}>{item.vote_average}</span> / <span className={css.count}>{item.vote_count}</span></p>
          <Genres list={item.genre_ids}/>
        </div>
      </div>
    </div>
    </Link>
  )
}

export default Card;
