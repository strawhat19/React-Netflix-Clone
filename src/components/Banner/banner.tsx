import * as React from 'react';
import{ useEffect } from "react";
import { testingMovie } from '../../App';
import { truncate } from '../Row/row';
import "./styles/banner.css";
import Moment from 'react-moment';
import BannerButtons from './bannerButtons';

export const removeDuplicateObjFromArray = (array?:any) => {
    const uniqueArray = array?.filter((value?:any, index?:any) => {
        const _value = JSON.stringify(value);
        return index === array?.findIndex((obj?:any) => {
            return JSON.stringify(obj) === _value;
        });
    });
    return uniqueArray;
}

const Banner: React.FC<Banner> = ({user, setUser, list, setList, fetchMovie, state, movie, setMovie}) => {
    
    const banner = document.querySelector(`#banner`);

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
            const bannerMovie = movie.results[lastMovie];
            localStorage.setItem(`Banner Movie`, JSON.stringify(bannerMovie));
            movie.results[lastMovie] ? setMovie(bannerMovie) : setMovie(testingMovie);
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
        },10000)

    }, [fetchMovie])

    const movieName = movie?.name || movie?.title || movie?.original_name;

    return (
        <div className="banner animatedBanner" id="banner" style={{ 
                backgroundSize: `cover`,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 50%,var(--blackGlass), black),url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
            }}>
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
                <BannerButtons user={user} setUser={setUser} fetchMovie={fetchMovie} list={list} setList={setList} state={state} movie={movie} setMovie={setMovie} />
                <p className="bannerDescription" title={movie?.overview}>{truncate(movie?.overview, 150)}</p>
            </div>
        </div>
    );
}

export default Banner