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

const animation = `@keyframes backgroundMove {
    0% {
      background-position: 0% center !important;
    }
    100% {
      background-position: 100% center !important;
    }
  }`;

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

    const movieName = movie?.name || movie?.title || movie?.original_name;
    console.log(movie)

    return (
    <div className="banner" style={{ 
            backgroundSize: `cover`,
            backgroundPosition: `45% center`,
            backgroundImage: `linear-gradient(transparent 50%,var(--blackGlass), black),url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            animation: `backgroundMove 3s ease-in-out infinite alternate !important`,
        }}>
        <div className={`innerBanner`}>
            <h1 className="movieName">{movieName}</h1>
            <div className="bannerButtons">
                <button className="play"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path d="M3 2.69127C3 1.93067 3.81547 1.44851 4.48192 1.81506L21.4069 11.1238C22.0977 11.5037 22.0977 12.4963 21.4069 12.8762L4.48192 22.1849C3.81546 22.5515 3 22.0693 3 21.3087V2.69127Z" fill="currentColor"></path></svg> Play</button>
                <button className="myList"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg> My List</button>
            </div>
            <p className="bannerDescription" title={movie?.overview}>{truncate(movie?.overview, 150)}</p>
        </div>
    </div>
    );
}

export default Banner