import * as React from 'react';
import{ useEffect } from "react";
import { capitalizeWord, banner, truncate, update, bannerMovies } from '../../App';
import { Button } from '@mui/material';
import "./styles/banner.css";
import Moment from 'react-moment';
import Dashboard from '../Dashboard/dashboard';

const Banner: React.FC<State> = ({user, setUser, fetchMovie, movie, setMovie}) => {

    const movieName = movie?.name || movie?.title || movie?.original_name;

    if (movieName === `Dont Look Up`) {
        console.log(movie);
    }

    const animatedBanner = () => {
        if (window.scrollY > 0) {
            banner?.classList.add(`scrolledBanner`);
            banner?.classList.remove(`animatedBanner`);
        } else {
            banner?.classList.remove(`scrolledBanner`);
            banner?.classList.add(`animatedBanner`);
        }
    }

    useEffect(() => {

        const getMovie = async () => {
            const response = await fetch(fetchMovie);
            const movie:any = await response.json();
            const lastMovie = Math.floor(Math.random() * movie.results.length - 1);
            const x = (array?:any) => Math.floor(Math.random() * array.length);
            const randomBanner:any = bannerMovies[x(bannerMovies)];
            const bannerMovie = movie.results[lastMovie];
            console.log(`bannerMovies`, bannerMovies);
            console.log(`randomBanner`, randomBanner);
            console.log(`randomBanner`, randomBanner?.title);
            console.log(`bannerMovie`, bannerMovie);
            console.log(`bannerMovie`, bannerMovie?.title);
            localStorage.setItem(`Banner Movie`, JSON.stringify(bannerMovie));
            movie.results[lastMovie] ? setMovie(bannerMovie) : setMovie(randomBanner);
            return movie;
        }

        window.addEventListener(`scroll`, event => {
            animatedBanner();
            return () => window.removeEventListener(`scroll`, event => {
                animatedBanner();
            })
        })
        
        getMovie();
        setInterval(() => {
            getMovie();
        },7500)

    }, [fetchMovie, setMovie])

    return (
        <div className="banner animatedBanner" id="banner" style={{ 
                backgroundSize: `cover`,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 50%,var(--blackGlass), black),url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            }}>
            {/* <LazyLoadImage effect="blur" src={bannerPic} className="bannerImage" title={movieName} alt={movieName} width={1066} height={600} /> */}
            <div className={`innerBanner`}>
                <div className="titleData">
                    <h1 className="movieName">{movieName}</h1>
                    <div className="data">
                        <span title="popularity" className="popularity">{Math.floor(movie?.popularity)} <i className="fas fa-fire"></i></span>
                        <span title="votes" className="vote_count">{movie?.vote_count} <i className="fas fa-user"></i></span>
                        <span title="rating" className="vote_average">{movie?.vote_average * 10 + `%`} <i className="fas fa-thumbs-up"></i></span>
                        <span title="release date" className="release_date"><Moment format='MMMM Do YYYY'>{movie?.release_date}</Moment> <i className="fas fa-calendar-day"></i></span>
                    </div>
                </div>
                <div className="buttons" data-movie={JSON.stringify(movie)}>
                    <ul className='dash'>
                        <Dashboard user={user} setUser={setUser} />
                    </ul>
                    <Button className="play"><i className="fas fa-play"></i> Play</Button>
                    {user?.list?.includes(movie) ? (
                        <Button className={`listButton updateButton minus`} data-movie={JSON.stringify(movie)} id="minus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-minus"></i> <div className="buttonText">Delete {capitalizeWord(movieName)}</div></Button>
                    ) : (
                        <Button className={`listButton updateButton plus`} data-movie={JSON.stringify(movie)}  id="plus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-plus"></i> <div className="buttonText">Add {capitalizeWord(movieName)}</div></Button>
                    )}
                </div>
                <p className="bannerDescription" title={movie?.overview}> {movie?.overview === `` ?  
                    <div className="noDesc">
                        This Movie Has No Description!
                    </div> : movieName?.length > 19 ? truncate(movie?.overview, 135) : truncate(movie?.overview, 145)}</p>
            </div>
        </div>
    );
}

export default Banner