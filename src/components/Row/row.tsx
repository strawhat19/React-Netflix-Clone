import * as React from 'react';
import{useState,useEffect} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { truncate, baseImageURL, posterH, posterW } from '../../App';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./styles/row.css";

const Row: React.FC<State> = ({title, movieURL}) => {

    const [movies, setMovies] = useState<any>(null);

    useEffect(() => {
        const getMovies = async (movieURL:any) => {
            const response = await fetch(movieURL);
            const rowMovies = await response.json();
            setMovies(rowMovies.results.sort((a:any, b:any) => 0.5 - Math.random()));
            return rowMovies;
        }
        getMovies(movieURL);
    }, [movieURL]);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="movieRow">
            {!movies && (
                    <>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                    </>
                )}
                {movies && (
                    movies.map((movie:any,index:any) => {

                        const posterPic = baseImageURL+movie?.poster_path;
                        const movieName = movie?.name || movie?.title || movie?.original_name;

                        return (
                            <div className="movie" key={index+`-`+movie?.id}>
                                <div className="overlay">
                                    <div className="titleData">
                                        <h2 className="movieName">{truncate(movieName,20)}</h2>
                                        <div className="data">
                                            <span className="vote_average">{movie?.vote_average * 10 + `%`} <i className="fas fa-thumbs-up"></i></span>
                                            <span className="vote_count">{movie?.vote_count} <i className="fas fa-user"></i></span>
                                        </div>
                                    </div>
                                    {movieName.length > 20 ? truncate(movie?.overview, 135) : truncate(movie?.overview, 165)}
                                </div>
                                <LazyLoadImage effect="blur" src={title !== `Netflix Originals` ? posterPic : posterPic} id={`movie-${index}`} className="movie moviePoster" alt={movieName} width={title !== `Netflix Originals` ? posterW : posterW} height={title !== `Netflix Originals` ? posterH : posterH} />
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default Row