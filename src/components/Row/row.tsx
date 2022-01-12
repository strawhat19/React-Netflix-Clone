import React, {useState, useEffect} from "react";
import "./styles/row.css";

const baseImageURL = `https://image.tmdb.org/t/p/original`;

interface Props {
    title: string,
    movieURL: string
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

    console.log(movies);

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="movieRow">
                {movies && (
                    movies.map((movie:any,index:any) => ( 
                        <img key={index+`-`+movie.id} src={baseImageURL+movie.poster_path} id={`movie-${index}`} className="movie moviePoster" alt={movie.title} />
                    )))
                }
                {!movies && (
                    <>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                        <div className="skeleton movie">SKELETON TEST</div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Row