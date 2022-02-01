import * as React from 'react';
import{ useEffect } from "react";
import { APIKey, baseTMDBURL, capitalizeWord, truncate, update } from '../../App';
import { Button } from '@mui/material';
import "./styles/banner.css";
import Moment from 'react-moment';
import Dashboard from '../Dashboard/dashboard';
import { LazyLoadImage } from 'react-lazy-load-image-component';

// Good Looking Banner Movies
export const bannerMovies = [
    {
      "adult": false,
      "backdrop_path": "/mo57hzhW3BcZL1f7MNteWKHsmlN.jpg",
      "genre_ids": [
          28,
          53
      ],
      "id": 763788,
      "original_language": "en",
      "original_title": "Dangerous",
      "overview": "A reformed sociopath heads to a remote island after the death of his brother. Soon after his arrival, the island falls under siege from a deadly gang of mercenaries, and when he discovers their role in his brother’s demise, he sets out on a relentless quest for vengeance.",
      "popularity": 1650.471,
      "poster_path": "/vTtkQGC7qKlSRQJZYtAWAmYdH0A.jpg",
      "release_date": "2021-11-05",
      "title": "Dangerous",
      "video": false,
      "vote_average": 6.7,
      "vote_count": 118
  },
    {
      "adult": false,
      "backdrop_path": "/vxS1fkt6xQWtYNyFkm6D6OhV0sR.jpg",
      "genre_ids": [
          99
      ],
      "id": 653740,
      "original_language": "en",
      "original_title": "Assassins",
      "overview": "True crime meets global spy thriller in this gripping account of the assassination of Kim Jong-nam, the half brother of the North Korean leader. The film follows the trial of the two female assassins, probing the question: were the women trained killers or innocent pawns of North Korea?",
      "popularity": 113.998,
      "poster_path": "/guEH393qNWWh2wBJoGP7oqmjTK5.jpg",
      "release_date": "2021-08-12",
      "title": "Assassins",
      "video": false,
      "vote_average": 7.3,
      "vote_count": 6
  },
    {
      "adult": false,
      "backdrop_path": "/nvxrQQspxmSblCYDtvDAbVFX8Jt.jpg",
      "genre_ids": [
          35,
          18,
          878
      ],
      "id": 646380,
      "original_language": "en",
      "original_title": "Don't Look Up",
      "overview": "Two low-level astronomers must go on a giant media tour to warn humankind of an approaching comet that will destroy planet Earth.",
      "popularity": 633.346,
      "poster_path": "/th4E1yqsE8DGpAseLiUrI60Hf8V.jpg",
      "release_date": "2021-12-07",
      "title": "Don't Look Up",
      "video": false,
      "vote_average": 7.3,
      "vote_count": 3929
  },
    {
      "adult": false,
      "backdrop_path": "/4Z89BwPQHoCXKSAnOFwulaqyYXG.jpg",
      "genre_ids": [
          99
      ],
      "id": 900887,
      "original_language": "es",
      "original_title": "Diego, El último adiós",
      "overview": "The last year in the life of Diego Maradona told by friends, family and former companions reveals his deep humanity. In the midst of the Covid 19 pandemic, a Maradonian funeral sends him away amid tears, songs and tear gas.",
      "popularity": 74.152,
      "poster_path": "/hUmpWqixNRe9EfsmbzccJQV0gt.jpg",
      "release_date": "2021-11-25",
      "title": "Diego, The Last Goodbye",
      "video": false,
      "vote_average": 6,
      "vote_count": 2
    }
  ]

const Banner: React.FC<State> = ({user, setUser, fetchMovie, movie, setMovie}) => {

    const movieName = movie?.name || movie?.title || movie?.original_name;

    useEffect(() => {
        
        const getMovie = async () => {
            const response = await fetch(fetchMovie);
            const movie:any = await response.json();
            const lastMovie = Math.floor(Math.random() * movie.results.length - 1);
            const bannerMovie = movie.results[lastMovie];
            const x = (array?:any) => Math.floor(Math.random() * array.length);
            const randomBanner:any = bannerMovies[x(bannerMovies)];
            // console.log(`bannerMovies`, bannerMovies);
            // console.log(`randomBanner`, randomBanner);
            // console.log(`randomBanner`, randomBanner?.title);
            // console.log(`bannerMovie`, bannerMovie);
            // console.log(`bannerMovie`, bannerMovie?.title);
            localStorage.setItem(`Banner Movie`, JSON.stringify(bannerMovie));
            movie.results[lastMovie] ? setMovie(bannerMovie) : setMovie(randomBanner);
            const trailerURL = `${baseTMDBURL}/movie/${bannerMovie?.id}/videos?api_key=${APIKey}&language=en-US`;
            console.log(`trailerURL`, trailerURL);
            return movie;
        }
        
        const x = (array?:any) => Math.floor(Math.random() * array.length);
        const randomBanner:any = bannerMovies[x(bannerMovies)];
        setMovie(randomBanner);
        setInterval(() => {
            getMovie();
        }, 7500)

    }, [fetchMovie, setMovie])

    return (
        <div className={`banner animatedBanner`} id="banner">
            <LazyLoadImage effect="blur" src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} className="bannerImage" title={movieName} alt={movieName} width={`100%`} height={`100%`} />
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