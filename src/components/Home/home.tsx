import * as React from 'react'
import { Suspense } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import Movie from '../Movie/movie';
import Row from '../Row/row';
import Footer from '../Footer/footer';
import { movieURLS, capitalize, randomMovieURL } from '../../App';
import List from '../List/list';

const Home: React.FC<State> = ({user, setUser, movie, setMovie, movies, setMovies, updateUser}) => {

    console.log(setUser);

    const username = user?.username;

    return (
        <>
            <Header user={user} setUser={setUser} updateUser={updateUser} />
            <TopButton />
            <Suspense fallback={<>Banner Loading</>}>
                <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} movie={movie} setMovie={setMovie} updateUser={updateUser} />
            </Suspense>
            <Suspense fallback={<main>Movies Loading...</main>}>
                <main className="movieRows">
                    <List user={user} setUser={setUser} updateUser={updateUser} />
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Netflix Originals" movieURL={movieURLS.netflixOriginals} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Trending Now" movieURL={movieURLS.trending} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="In Theaters" movieURL={movieURLS.inTheaters} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Top Rated" movieURL={movieURLS.topRated} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Action" movieURL={movieURLS.action} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Comedies" movieURL={movieURLS.comedy} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Horror" movieURL={movieURLS.horror} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>   
                        <Row title="Romance" movieURL={movieURLS.romance} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Documentaries" movieURL={movieURLS.documentaries} movies={movies} setMovies={setMovies} updateUser={updateUser} />
                    </Suspense>
                </main>
            </Suspense>
            <Footer />
          </>
    )
}

export default Home