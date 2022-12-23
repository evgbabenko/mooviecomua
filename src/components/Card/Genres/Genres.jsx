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
    <ul className={css.genrebages}>
      {
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
