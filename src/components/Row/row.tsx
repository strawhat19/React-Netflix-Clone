import React, {useState, useEffect} from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import "./styles/row.css";

const baseImageURL = `https://image.tmdb.org/t/p/original`;

interface Props {
    title: string,
    movieURL: string,
    [key: string]: any
} 

const Row: React.FC<Props> = ({title, movieURL}) => {
    const [movies, setMovies] = useState<any>(null);

    useEffect(() => {
        const getMovies = async (movieURL: string) => {
            const response = await fetch(movieURL);
            const movies = await response.json();
            setMovies(movies.results);
            return movies;
        }
        getMovies(movieURL);
    }, [movieURL]);

    // console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="movieRow">
            {!movies && (
                    <>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                        <div className="skeleton movie">
                            <img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" />
                        </div>
                    </>
                )}
                {movies && (
                    movies.map((movie:any,index:any) => ( 
                        <LazyLoadImage effect="blur" key={index+`-`+movie.id} src={baseImageURL+movie.poster_path} id={`movie-${index}`} className="movie moviePoster" alt={movie.title} width="165px" height="250px" />
                    )))
                }
            </div>
        </div>
    )
}

export default Row