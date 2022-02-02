import * as React from 'react'
import { useState } from "react";
import { truncate, baseImageURL, update, baseTMDBURL, APIKey, opts } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button, Modal } from '@mui/material';
import YouTube from 'react-youtube';
import './styles/movie.css';

export const wideW = `336px`;
export const wideH = `189px`;
export const posterW = `165px`;
export const posterH = `250px`;

const Movie:React.FC<State> = ({user, setUser, movie, index}) => {
  
    const posterPic = baseImageURL+movie?.poster_path;
    const movieName = movie?.name?.split(`:`)[0] || movie?.title?.split(`:`)[0] || movie?.original_name?.split(`:`)[0];
    const movieSplit = movieName?.split(` `)[0] + ` ` + movieName?.split(` `)[1];
    const [openTrailer, setOpenTrailer] = useState<any>(false);
    const [trailer, setTrailer] = useState<any>(``);

    return (
        <div className="movie movieElement" key={index+`-`+movie?.id} title={movieName} id={movieName}>
            <div className="overlay">
                <div className="titleData">
                    <h2 className="movieName">
                        {movieName?.split(` `)?.length > 1 ? movieSplit?.length > 17 ? truncate(movieSplit, 17) : movieName?.length > 17 ? truncate(movieName, 17) : truncate(movieSplit, 17) : truncate(movieName, 17)}
                    </h2>
                    <div className="data">
                        <span className="vote_count">{movie?.vote_count} <i className="fas fa-user"></i></span>
                        <span className="vote_average">{movie?.vote_average * 10 + `%`} <i className="fas fa-thumbs-up"></i></span>
                    </div>
                </div>
                <div className="movieDescription">
                    {movie?.overview === `` ?  
                    <div className="noDesc">
                        This Movie Has No Description!
                    </div> : movieName?.length > 19 ? truncate(movie?.overview, 135) : truncate(movie?.overview, 145)}
                </div>
                <div className="buttons" data-movie={JSON.stringify(movie)}>
                    <Button className="play playMovie movieButton" id={movie?.id} onClick={(event) => {
                        const trailerURL = `${baseTMDBURL}/movie/${movie?.id}/videos?api_key=${APIKey}&language=en-US`;
                        fetch(trailerURL).then(response => response.json()).then(data => {
                            if (data?.results?.length > 0) {
                                setTrailer(data?.results[0]?.key);
                            } else {
                                console.log(`This Movie Has No Youtube Trailers`);
                            }
                        }).catch((error) => console.log(error));
                        setOpenTrailer(true)
                    }}><i className="fas fa-play"></i> Play</Button>
                    <Modal open={openTrailer} onClose={() => setOpenTrailer(false)} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                        <div className="movieTrailer">
                            {trailer ? (
                                <>  
                                    <div className="trailer trailerTitle"><h1 className="movieName">{movieName}</h1></div>
                                    <YouTube videoId={trailer} opts={opts} />
                                </>
                            ) : (
                                <div className="trailer noTrailer">There is No Trailer to Display For This Movie at This Time.</div>
                            )}
                        </div>
                    </Modal>
                    {user?.list?.includes(movie) ? (
                        <Button className={`listButton updateButton minus movieButton`} data-movie={JSON.stringify(movie)} id="minus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-minus-circle"></i> Del</Button>
                    ) : (
                        <Button className={`listButton updateButton plus movieButton`} data-movie={JSON.stringify(movie)}  id="plus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-plus"></i> Add</Button>
                    )}
                </div>
            </div>
            <LazyLoadImage effect="blur" src={movieName !== `Netflix Originals` ? posterPic : posterPic} id={`movie-${index}`} className="movie moviePoster" alt={movieName} width={movieName !== `Netflix Originals` ? posterW : posterW} height={movieName !== `Netflix Originals` ? posterH : posterH} />
        </div>
    )
}

export default Movie