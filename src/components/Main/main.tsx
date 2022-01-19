import * as React from 'react';
import {Suspense} from "react";
import Row from '../Row/row';
import { movieURLS } from '../../App';

const Main: React.FC<State> = ({movies, setMovies}) => {

    return (
        <main className="movieRows">
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