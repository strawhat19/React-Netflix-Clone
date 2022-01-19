import * as React from 'react'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import TopButton from '../TopButton/topbutton';
import { capitalize } from '../Header/header'
import { truncate } from '../Row/row';
import Banner from '../Banner/banner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const APIKey = `da9b0d504005e1243db4e403678fba18`;
const baseTMDBURL = `https://api.themoviedb.org/3`
const movieURLS = {
  trending: `${baseTMDBURL}/trending/all/week?api_key=${APIKey}&language=en-US`,
  netflixOriginals: `${baseTMDBURL}/discover/tv?api_key=${APIKey}&with_networks=213`,
  topRated: `${baseTMDBURL}/movie/top_rated?api_key=${APIKey}&language=en-US`,
  action: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=28`,
  comedy: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=35`,
  horror: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=27`,
  romance: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=10749`,
  documentaries: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&with_genres=99`,
  inTheaters: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`
}

const posterW = `165px`;
const posterH = `250px`;
const baseImageURL = `https://image.tmdb.org/t/p/original`;
const movieURLArray = Object.values(movieURLS);
const lastMovieInArray = movieURLArray.length - 1;
const randomMovieURL = movieURLArray[Math.floor(Math.random() * lastMovieInArray)];

const MyList: React.FC<Banner> = ({user, setUser, list, setList, state, setState}) => {

    const username = user.username;

    return (
        <>
        <Header user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} />
        <TopButton />
        <main className="content myList multiple">
            <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} list={list} setList={setList} state={state} setState={setState} />
            <div className="inner">
                <div className="initial">
                    <h1 className={`cHeader`}>{capitalize(username)}'s List ({`${user.list.length}`})</h1>
                    <div className="row" >
                        <div className="movieRow">
                            {user.list.length == 0 ? (
                                <div className="pleaseAdd">Please Add Movies</div>
                            ) : (
                                <>
                                {user.list.map((movie:any,index:any) => {

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
            </div>
        </main>
        <Footer />
        </>
    )
}   

export default MyList