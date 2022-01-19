import * as React from 'react'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import TopButton from '../TopButton/topbutton';
import { capitalize, truncate, baseImageURL, posterH, posterW, randomMovieURL } from '../../App'
import Banner from '../Banner/banner';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const MyList: React.FC<State> = ({user, setUser, movie, setMovie}) => {

    const username = user.username;

    return (
        <>
        <Header user={user} setUser={setUser} movie={movie} setMovie={setMovie} />
        <TopButton />
        <main className="content myList multiple">
            <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} />
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