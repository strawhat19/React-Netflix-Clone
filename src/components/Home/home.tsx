import * as React from 'react'
import { Suspense } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import Movie from '../Movie/movie';
import Row from '../Row/row';
import Footer from '../Footer/footer';
import { movieURLS, capitalize, randomMovieURL } from '../../App';

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
                    {user?.list?.length !== 0 ? (
                        <div className="list">
                        <div className="row" >
                            <h2 className={`cHeader`}>{capitalize(username)}'s List ({`${user?.list?.length}`})</h2>
                            <div className="movieRow">
                                {user?.list?.length == 0 ? (
                                    <div className="pleaseAdd">Please Add Movies</div>
                                    ) : (
                                    <>
                                        {user?.list?.map((movie:any,index:any) => <Movie user={user} setUser={setUser} movie={movie} index={index} updateUser={updateUser} />)}
                                    </>
                                )}
                            </div>
                        </div>
                        </div>
                    ) : <div className='myList'></div>}
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