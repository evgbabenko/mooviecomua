import React, { useState } from 'react';
import { Service } from '../../services/script';

import css from './Genres.module.css';

const Genres = (props) => {
  const [genres, setGenres] = useState([]);
  const [list] = useState(props.list)
  if (genres.length < 1) {
    new Service().getGenres().then((data) => {
      setGenres(data.genres);
    })
  }
  return (
    props.detailed ? 
      <ul className={css.movie_genrebages}>
        {
          // eslint-disable-next-line array-callback-return
          list.map((list_genres, index) => {
             return <li className={css.genrebage} key={index}>{list_genres.name}</li>
          })
        }
      </ul>
    : <ul className={css.genrebages}>
      {
        // eslint-disable-next-line array-callback-return
        genres.map((item_genres, index) => {
          for (let i = 0; i < list.length - 1; i++)
            if (list[i] === item_genres.id)
              return <li className={css.genrebage} key={index}>{item_genres.name}</li>
        })
      }
    </ul>
  );
}

export default Genres;
