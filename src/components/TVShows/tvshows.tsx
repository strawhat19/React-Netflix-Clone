import * as React from 'react'
import {Suspense} from 'react'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Row from '../Row/row';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import { randomMovieURL, movieURLS } from '../../App';

const TVShows: React.FC<State> = ({user, setUser, movie, setMovie, movies, setMovies}) => {
    return (
        <>
        <Header user={user} setUser={setUser} movie={movie} setMovie={setMovie} />
        <TopButton />
        <main className="content tvShows multiple">
            <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} />
            <div className="inner">
                <div className="initial">
                    <h1 className={`cHeader`}>TV Shows</h1>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="" movieURL={movieURLS.netflixOriginals} movies={movies} setMovies={setMovies} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Docuseries" movieURL={movieURLS.documentaries} movies={movies} setMovies={setMovies} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Trending" movieURL={movieURLS.trending} movies={movies} setMovies={setMovies} />
                    </Suspense>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}   

export default TVShows