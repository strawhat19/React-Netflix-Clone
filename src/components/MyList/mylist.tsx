import * as React from 'react'
import {Suspense} from 'react'
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Row from '../Row/row';
import TopButton from '../TopButton/topbutton';
import { capitalize } from '../Header/header'
import Banner from '../Banner/banner';

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

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

const movieURLArray = Object.values(movieURLS);
const lastMovieInArray = movieURLArray.length - 1;
const randomMovieURL = movieURLArray[Math.floor(Math.random() * lastMovieInArray)];

const MyList: React.FC<Props> = ({user, setUser}) => {
    const username = user?.username;
    return (
        <>
        <Header user={user} setUser={setUser} />
        <TopButton />
        <main className="content myList multiple">
            <Banner fetchMovie={randomMovieURL} />
            <div className="inner">
                <div className="initial">
                    <h1 className={`cHeader`}>{capitalize(username)}'s List</h1>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title={``} movieURL={movieURLS.topRated} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="In Theaters" movieURL={movieURLS.inTheaters} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Action" movieURL={movieURLS.action} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>   
                        <Row title="Romance" movieURL={movieURLS.romance} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Comedies" movieURL={movieURLS.comedy} />
                    </Suspense>
                    <Suspense fallback={<div className="skeleton movie"><img className="icon" src="https://raw.githubusercontent.com/strawhat19/react-netflix-clone/main/public/assets/netflixIcon.png" alt="icon" /></div>}>
                        <Row title="Horror" movieURL={movieURLS.horror} />
                    </Suspense>
                </div>
            </div>
        </main>
        <Footer />
        </>
    )
}   

export default MyList