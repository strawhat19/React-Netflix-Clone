import * as React from 'react'
import { truncate, baseImageURL, posterH, posterW, update } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '@mui/material';
import './styles/movie.css';

const Movie:React.FC<State> = ({user, setUser, movie, index}) => {

    const posterPic = baseImageURL+movie?.poster_path;
    const movieName = movie?.name?.split(`:`)[0] || movie?.title?.split(`:`)[0] || movie?.original_name?.split(`:`)[0];
    const movieSplit = movieName?.split(` `)[0] + ` ` + movieName?.split(` `)[1];
    movie?.overview === `` ? console.log(movie) : console.log(movie);

    return (
        <div className="movie" key={index+`-`+movie?.id} title={movieName}>
            <div className="overlay">
                <div className="titleData">
                    <h2 className="movieName">
                        {movieName?.split(` `)?.length > 1 ? movieSplit?.length > 17 ? truncate(movieSplit, 17) : movieName?.length > 17 ? truncate(movieName, 17) : truncate(movieSplit, 17) : truncate(movieName, 17)}
                    </h2>
                    <div className="data">
                        <span className="vote_count">{movie?.vote_count} <i className="fas fa-user"></i></span>
                        <span className="vote_average">{movie?.vote_average * 10 + `%`} <i className="fas fa-thumbs-up"></i></span>
                    </div>
                </div>
                <div className="movieDescription">
                    {movie?.overview === `` ?  
                    <div className="noDesc">
                        This Movie Has No Description!
                    </div> : movieName?.length > 19 ? truncate(movie?.overview, 135) : truncate(movie?.overview, 145)}
                </div>
                <div className="buttons" data-movie={JSON.stringify(movie)}>
                    <Button className="play"><i className="fas fa-play"></i> Play</Button>
                    {user?.list?.includes(movie) ? (
                        <Button className={`listButton updateButton minus`} data-movie={JSON.stringify(movie)} id="minus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-minus"></i> Del</Button>
                    ) : (
                        <Button className={`listButton updateButton plus`} data-movie={JSON.stringify(movie)}  id="plus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-plus"></i> Add</Button>
                    )}
                </div>
            </div>
            <LazyLoadImage effect="blur" src={movieName !== `Netflix Originals` ? posterPic : posterPic} id={`movie-${index}`} className="movie moviePoster" alt={movieName} width={movieName !== `Netflix Originals` ? posterW : posterW} height={movieName !== `Netflix Originals` ? posterH : posterH} />
        </div>
    )
}

export default Movie