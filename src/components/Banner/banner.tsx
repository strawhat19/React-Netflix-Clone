import * as React from 'react';
import{useState, useEffect, useContext} from "react";
import "./styles/banner.css";
import Moment from 'react-moment';
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal';

interface Props {
    fetchMovie: string,
    [key: string]: any
}

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

const Banner: React.FC<Props> = ({fetchMovie}) => {

    let [movie, setMovie] = useState<any>(defaultMovie);
    const [open, setOpen] = useState<any>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        const getMovie = async () => {
            const response = await fetch(fetchMovie);
            const movie:any = await response.json();
            const lastMovie = Math.floor(Math.random() * movie.results.length - 1);
            movie.results[lastMovie] ? setMovie(movie.results[lastMovie]) : setMovie(defaultMovie);
            return movie;
        }
        getMovie();

    }, [fetchMovie])

    const movieName = movie?.name || movie?.title || movie?.original_name;
    const truncate = (string:string,end:number) => {
        return string?.length > end ? string.substring(0, end - 1) + `...` : string;
    }

    return (
        <div className="banner" style={{ 
                backgroundSize: `cover`,
                backgroundPosition: `45% center`,
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1) 50%,var(--blackGlass), black),url('https://image.tmdb.org/t/p/original/${movie?.backdrop_path}')`,
                animation: `backgroundMove 3s ease-in-out infinite alternate !important`,
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
                    <Button onClick={handleOpen} className="myList"><i className="fas fa-list-ul"></i> My List</Button>
                    <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <div>Working on List Component Now</div>
                    </Modal>
                </div>
                <p className="bannerDescription" title={movie?.overview}>{truncate(movie?.overview, 150)}</p>
            </div>
        </div>
    );
}

export default Banner