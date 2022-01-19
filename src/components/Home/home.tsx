import * as React from 'react'
import { Suspense } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import Main from '../Main/main';
import Footer from '../Footer/footer';
import { randomMovieURL } from '../../App';

const Home: React.FC<State> = ({user, setUser, movie, setMovie, movies, setMovies}) => {
    return (
        <>
            <Header user={user} setUser={setUser} movie={movie} setMovie={setMovie} />
            <TopButton />
            <Suspense fallback={<>Banner Loading</>}>
                <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} />
            </Suspense>
            <Suspense fallback={<main>Movies Loading...</main>}>
                <Main user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} movies={movies} setMovies={setMovies} />
            </Suspense>
            <Footer />
          </>
    )
}

export default Home