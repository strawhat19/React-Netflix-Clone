import * as React from 'react';
import{useState, useEffect, useContext} from "react";
import Header from './components/Header/header';
import Banner from './components/Banner/banner';
import Row from './components/Row/row';
import TopButton from './components/TopButton/topbutton';
import Footer  from './components/Footer/footer';
import './sass/App.css';
// import $ from 'jquery';

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
  
  export default class App extends React.Component {
    render() {
      return (
        <div className="App">
        <Header />
        <Banner fetchMovie={randomMovieURL} />
        <main className="movieRows">
          <Row title="Netflix Originals" movieURL={movieURLS.netflixOriginals} />
          <Row title="Trending Now" movieURL={movieURLS.trending} />
          <Row title="In Theaters" movieURL={movieURLS.inTheaters} />
          <Row title="Top Rated" movieURL={movieURLS.topRated} />
          <Row title="Action" movieURL={movieURLS.action} />
          <Row title="Comedies" movieURL={movieURLS.comedy} />
          <Row title="Horror" movieURL={movieURLS.horror} />
          <Row title="Romance" movieURL={movieURLS.romance} />
          <Row title="Documentaries" movieURL={movieURLS.documentaries} />
        </main>
        <TopButton />
        <Footer />
      </div>
    );  
  }
}