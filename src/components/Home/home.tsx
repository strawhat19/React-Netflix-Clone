import * as React from 'react'
import { Suspense } from 'react'
import Header from '../Header/header';
import TopButton from '../TopButton/topbutton';
import Banner from '../Banner/banner';
import Main from '../Main/main';
import Footer from '../Footer/footer';

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

const Home: React.FC<State> = ({user, setUser}) => {
    return (
        <>
            <Header user={user} setUser={setUser} />
            <TopButton />
            <Suspense fallback={<>Banner Loading</>}>
                <Banner user={user} setUser={setUser} fetchMovie={randomMovieURL} />
            </Suspense>
            <Suspense fallback={<main>Movies Loading...</main>}>
                <Main />
            </Suspense>
            <Footer />
          </>
    )
}

export default Home