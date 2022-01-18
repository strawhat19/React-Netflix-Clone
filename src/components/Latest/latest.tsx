import * as React from 'react'
import {Suspense} from 'react'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Row from '../Row/row';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

const APIKey = `da9b0d504005e1243db4e403678fba18`;
const baseTMDBURL = `https://api.themoviedb.org/3`
const movieURLS = {
    topRated: `${baseTMDBURL}/movie/top_rated?api_key=${APIKey}&language=en-US`,
    trending: `${baseTMDBURL}/trending/all/week?api_key=${APIKey}&language=en-US`,
    inTheaters: `${baseTMDBURL}/discover/movie?api_key=${APIKey}&primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22`
}

const movieURLArray = Object.values(movieURLS);
const lastMovieInArray = movieURLArray.length - 1;
const randomMovieURL = movieURLArray[Math.floor(Math.random() * lastMovieInArray)];

const Latest: React.FC<Props> = ({user, setUser}) => {
    return (
        <>
        <Header user={user} setUser={setUser} />
        <TopButton />
        <main className="content latest multiple">
            <Banner fetchMovie={randomMovieURL} />
            <div className="inner">
                <div className="initial">
                    <h1 className={`cHeader`}>New & Popular</h1>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="" movieURL={movieURLS.topRated} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Trending" movieURL={movieURLS.trending} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="In Theaters" movieURL={movieURLS.inTheaters} />
                    </Suspense>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}   

export default Latest