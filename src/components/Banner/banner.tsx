import * as React from 'react';
import{useState, useEffect, useContext} from "react";
import "./styles/banner.css";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            'person-info': PersonInfoProps
        }
    }
}

interface PersonInfoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
    heading: string,
    subHeading: string,
    size?: string
}

interface Props {
    fetchMovie: string,
    [key: string]: any
} 

const Banner: React.FC<Props> = ({fetchMovie}) => {

    
    const [movie, setMovie] = useState<any>(null);

    useEffect(() => {
        const getMovie = async () => {
            const response = await fetch(fetchMovie);
            const movies = await response.json();
            const lastMovie = Math.floor(Math.random() * movies.results.length - 1);
            setMovie(movies.results[lastMovie]);

            return movies;
        }
        getMovie();
    }, [])

    const truncate = (string:string,end:number) => {
        return string?.length > end ? string.substring(0, end - 1) + `...` : string;
    }

    return (
    <div className="banner" style={{ 
            backgroundSize: `cover`,
            backgroundPosition: `45% center`,
            backgroundImage: `linear-gradient(transparent 50%,var(--blackGlass), black),url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`
        }}>
        <div className={`innerBanner`}>
            <h1 className="movieName">{movie?.name || movie?.title}</h1>
            <div className="bannerButtons">
                <button className="play">Play</button>
                <button className="myList">My List</button>
            </div>
            <p className="bannerDescription" title={movie?.overview}>{truncate(movie?.overview, 150)}</p>
        </div>
    </div>
    );
}

export default Banner