import * as React from 'react'
import { truncate, baseImageURL, posterH, posterW } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface Movie {
    movie?: any,
    index?: any
}

const Movie:React.FC<Movie> = ({movie, index}) => {

    const posterPic = baseImageURL+movie?.poster_path;
    const movieName = movie?.name || movie?.title || movie?.original_name;

    return (
        <div className="movie" key={index+`-`+movie?.id}>
            <div className="overlay">
                <div className="titleData">
                    <h2 className="movieName">
                    <i className="fas fa-film"></i> {truncate(movieName,19)}
                    </h2>
                    <div className="data">
                        <span className="vote_average">{movie?.vote_average * 10 + `%`} <i className="fas fa-thumbs-up"></i></span>
                        <span className="vote_coun">{movie?.vote_count} <i className="fas fa-user"></i></span>
                    </div>
                </div>
                <div className="movieDescription">
                    {movieName.length > 20 ? truncate(movie?.overview, 135) : truncate(movie?.overview, 165)}
                </div>
            </div>
            <LazyLoadImage effect="blur" src={movieName !== `Netflix Originals` ? posterPic : posterPic} id={`movie-${index}`} className="movie moviePoster" alt={movieName} width={movieName !== `Netflix Originals` ? posterW : posterW} height={movieName !== `Netflix Originals` ? posterH : posterH} />
        </div>
    )
}

export default Movie