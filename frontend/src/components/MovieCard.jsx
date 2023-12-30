import { Card } from 'flowbite-react';
import {Link} from 'react-router-dom'

function MovieCard(props) {
  return (

    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/movie/${props.movie._id}`}>
        <img className="rounded-t-lg" src={props.movie.thumbnail} alt="" />
      </Link>
      <div className="p-3">
        <a href="#">
          <h5 className="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">{props.movie.name}</h5>
        </a>

      </div>
    </div>

  );
}


export default MovieCard