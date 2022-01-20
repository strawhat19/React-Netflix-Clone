import * as React from 'react';
import{useState,useEffect} from "react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./styles/row.css";
import Movie from '../Movie/movie';

const Row: React.FC<State> = ({title, movieURL}) => {

    const [movies, setMovies] = useState<any>(null);

    useEffect(() => {
        const getMovies = async (movieURL:any) => {
            const response = await fetch(movieURL);
            const rowMovies = await response.json();
            const randomizedMovies = rowMovies.results.sort((a:any, b:any) => 0.5 - Math.random());
            setMovies(randomizedMovies);
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
                    movies.map((movie:any,index:any) => <Movie movie={movie} index={index} />)
                )}
            </div>
        </div>
    )
}

export default Row