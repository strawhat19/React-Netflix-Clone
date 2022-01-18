import * as React from 'react';
import{useState, useEffect} from "react";
import { capitalize } from '../Header/header';
import { truncate } from '../Row/row';
import "./styles/banner.css";
import Moment from 'react-moment';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';

export const removeDuplicateObjFromArray = (array:any) => {
    const uniqueArray = array.filter((value:any, index:any) => {
        const _value = JSON.stringify(value);
        return index === array.findIndex((obj:any) => {
            return JSON.stringify(obj) === _value;
        });
    });
    return uniqueArray;
}
const getList:any = localStorage.getItem(`List`);
const list = JSON.parse(getList) || [];

const defaultMovie:any = {
    "adult": false,
    "backdrop_path": "/lXhgCODAbBXL5buk9yEmTpOoOgR.jpg",
    "genre_ids": [
        12,
        14,
        28
    ],
    "id": 122,
    "original_language": "en",
    "original_title": "The Lord of the Rings: The Return of the King",
    "overview": "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
    "popularity": 126.126,
    "poster_path": "/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg",
    "release_date": "2003-12-01",
    "title": "The Lord of the Rings: The Return of the King",
    "video": false,
    "vote_average": 8.5,
    "vote_count": 18892
}

const Banner: React.FC<Banner> = ({user, setUser, fetchMovie}) => {

    let [movie, setMovie] = useState<any>(defaultMovie);
    const [open, setOpen] = useState<any>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const updateAndOpenList = () => {
        if (list.includes(movie)) {
            const toDelete = list.indexOf(movie);
            list.splice(toDelete,1);
            setUser({
                ...user,
               list: removeDuplicateObjFromArray(list)
            })
        } else {
            list.push(movie);
            setUser({
                ...user,
               list: removeDuplicateObjFromArray(list)
            })
        }
        handleOpen();
    }

    useEffect(() => {

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

        const getMovie = async () => {
            if (user.list.length == 0) {
                const response = await fetch(fetchMovie);
                const movie:any = await response.json();
                const lastMovie = Math.floor(Math.random() * movie.results.length - 1);
                const bannerMovie = movie.results[lastMovie];
                console.log(`bannerMovie`,bannerMovie);
                localStorage.setItem(`Banner Movie`, JSON.stringify(bannerMovie));
                movie.results[lastMovie] ? setMovie(bannerMovie) : setMovie(defaultMovie);
                return movie;
            } else {
                const response = await fetch(fetchMovie);
                const movie:any = await response.json();
                const lastMovie = Math.floor(Math.random() * movie.results.length - 1);
                const bannerMovie = movie.results[lastMovie];
                console.log(`bannerMovie`,bannerMovie);
                localStorage.setItem(`Banner Movie`, JSON.stringify(bannerMovie));
                movie.results[lastMovie] ? setMovie(bannerMovie) : setMovie(defaultMovie);
                return movie;
                // const lastMovie = Math.floor(Math.random() * list.length - 1);
                // const bMovie = list[lastMovie];
                // console.log(`bMovie`,bMovie);
                // setMovie(bMovie);
                // return bMovie;
            }
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
                <div className="bannerButtons">
                    <Button className="play"><i className="fas fa-play"></i> Play</Button>
                    {user?.list?.includes(movie) ? (
                        <Button onClick={updateAndOpenList} className="myList"><i className="fas fa-minus"></i> Remove from List</Button>
                    ) : (
                        <Button onClick={updateAndOpenList} className="myList"><i className="fas fa-plus"></i> Add to List</Button>
                    )}
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <div className={`listOfMovies`}>
                        {user.list.map((movie:any, index:any) => {
                            const movieName = movie?.name || movie?.title || movie?.original_name;
                            return (
                                <div className="movie" key={index} id={index}>{index+1+`. `+capitalize(movieName)}</div>
                            )
                        })}
                        </div>
                    </Modal>
                </div>
                <p className="bannerDescription" title={movie?.overview}>{truncate(movie?.overview, 150)}</p>
            </div>
        </div>
    );
}

export default Banner