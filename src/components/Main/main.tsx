import * as React from 'react';
import {Suspense} from "react";
import Row from '../Row/row';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { movieURLS, capitalize, truncate, baseImageURL, posterH, posterW } from '../../App';

const Main: React.FC<State> = ({user, movies, setMovies}) => {

    const username = user?.username;

    return (
        <main className="movieRows">
            {user?.list?.length !== 0 ? (
                <div className="list">
                  <div className="row" >
                    <h2 className={`cHeader`}>{capitalize(username)}'s List ({`${user?.list?.length}`})</h2>
                      <div className="movieRow">
                          {user?.list?.length == 0 ? (
                              <div className="pleaseAdd">Please Add Movies</div>
                            ) : (
                              <>
                              {user?.list?.map((movie:any,index:any) => {

                                  const posterPic = baseImageURL+movie?.poster_path;
                                  const movieName = movie?.name || movie?.title || movie?.original_name;

                                  return (
                                      <div className="movie" key={index+`-`+movie?.id}>
                                          <div className="overlay">
                                              <div className="titleData">
                                                  <h2 className="movieName">{truncate(movieName,20)}</h2>
                                                  <div className="data">
                                                      <span className="vote_average">{movie?.vote_average * 10 + `%`} <i className="fas fa-thumbs-up"></i></span>
                                                      <span className="vote_coun">{movie?.vote_count} <i className="fas fa-user"></i></span>
                                                  </div>
                                              </div>
                                              {movieName.length > 10 ? truncate(movie?.overview, 130) : truncate(movie?.overview, 165)}
                                          </div>
                                          <LazyLoadImage effect="blur" src={movieName !== `Netflix Originals` ? posterPic : posterPic} id={`movie-${index}`} className="movie moviePoster" alt={movieName} width={movieName !== `Netflix Originals` ? posterW : posterW} height={movieName !== `Netflix Originals` ? posterH : posterH} />
                                      </div>
                                  )
                              })}
                              </>
                          )}
                      </div>
                  </div>
                </div>
            ) : <div className='myList'></div>}
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Netflix Originals" movieURL={movieURLS.netflixOriginals} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Trending Now" movieURL={movieURLS.trending} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="In Theaters" movieURL={movieURLS.inTheaters} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Top Rated" movieURL={movieURLS.topRated} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Action" movieURL={movieURLS.action} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Comedies" movieURL={movieURLS.comedy} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Horror" movieURL={movieURLS.horror} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>   
                <Row title="Romance" movieURL={movieURLS.romance} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                <Row title="Documentaries" movieURL={movieURLS.documentaries} movies={movies} setMovies={setMovies} />
            </Suspense>
        </main>
    )
}

export default Main