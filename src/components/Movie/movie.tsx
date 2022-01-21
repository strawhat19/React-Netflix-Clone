import * as React from 'react'
import { truncate, baseImageURL, posterH, posterW, removeDuplicateObjFromArray } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Button } from '@mui/material';
import './styles/movie.css';

// Add Movie
export const addMovie = async (movie?:any, user?:any, setUser?:any) => {
    console.log(`Add Movie`);
    const email = user?.email;
    const username = user?.username;
    user?.list?.push(movie);
    const list = user?.list;
    setUser({
        email,
        username,
        list: removeDuplicateObjFromArray(list?.reverse())
    })
  }
  
  // Delete Movie
  export const deleteMovie = async (movie?:any, user?:any, setUser?:any) => {
    console.log(`Delete Movie`);
    const email = user?.email;
    const username = user?.username;
    const movieID = movie?.id;
    const filteredArray = user?.list?.filter((item?:any,index?:any) => {
      if (item.id !== movieID) {
        item.id = index;
        return item;
      }
    });
    setUser({
      email,
      username,
      list: removeDuplicateObjFromArray(filteredArray.reverse())
    })
  }
  
  // Update Movies
  export const update = async (user?:any, setUser?:any, movie?:any, includes?:any) => {
    console.log(`Update Movies`);
    const getUser:any = localStorage.getItem(`User`);
    user = JSON.parse(getUser) || user;
    if (includes) {
        deleteMovie(movie, user, setUser);
    } else {
      addMovie(movie, user, setUser);
    }
    localStorage.setItem(`Last User`, JSON.stringify(user));
  }

const Movie:React.FC<State> = ({user, setUser, movie, index}) => {

    const posterPic = baseImageURL+movie?.poster_path;
    const movieName = movie?.name?.split(`:`)[0] || movie?.title?.split(`:`)[0] || movie?.original_name?.split(`:`)[0];
    const movieSplit = movieName?.split(` `)[0] + ` ` + movieName?.split(` `)[1];

    return (
        <div className="movie" key={index+`-`+movie?.id} title={movieName}>
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
                    <Button className="play movieButton"><i className="fas fa-play"></i> Play</Button>
                    {user?.list?.includes(movie) ? (
                        <Button className={`listButton updateButton minus movieButton`} data-movie={JSON.stringify(movie)} id="minus" onClick={(event) => update(user, setUser, movie, user?.list?.includes(movie))}><i className="fas fa-minus-circle"></i> Del</Button>
                    ) : (
                        <Button className={`listButton updateButton plus movieButton`} data-movie={JSON.stringify(movie)}  id="plus" onClick={(event) => addMovie(user, setUser, movie)}><i className="fas fa-plus"></i> Add</Button>
                    )}
                </div>
            </div>
            <LazyLoadImage effect="blur" src={movieName !== `Netflix Originals` ? posterPic : posterPic} id={`movie-${index}`} className="movie moviePoster" alt={movieName} width={movieName !== `Netflix Originals` ? posterW : posterW} height={movieName !== `Netflix Originals` ? posterH : posterH} />
        </div>
    )
}

export default Movie