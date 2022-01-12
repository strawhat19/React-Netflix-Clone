import React from 'react';
import Header from './components/Header/header';
import Row from './components/Row/row';
import './sass/App.css';
// import $ from 'jquery';

const APIKey = `da9b0d504005e1243db4e403678fba18`;
const requests = {
  trending: `https://api.themoviedb.org/3/trending/all/week?api_key=${APIKey}&language=en-US`,
  netflixOriginals: `https://api.themoviedb.org/3/discover/tv?api_key=${APIKey}&with_networks=213`,
  topRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKey}&language=en-US`,
  action: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=28`,
  comedy: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=35`,
  horror: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=27`,
  romance: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=10749`,
  documentaries: `https://api.themoviedb.org/3/discover/movie?api_key=${APIKey}&with_genres=99`,
}

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="movieRows">
          <Row title="Trending Now" movieURL={requests.trending} />
          <Row title="Netflix Originals" movieURL={requests.netflixOriginals} />
          <Row title="Top Rated" movieURL={requests.topRated} />
          <Row title="Action" movieURL={requests.action} />
          <Row title="Comedies" movieURL={requests.comedy} />
          <Row title="Horror" movieURL={requests.horror} />
          <Row title="Romance" movieURL={requests.romance} />
          <Row title="Documentaries" movieURL={requests.documentaries} />
        </main>
      </div>
    );  
  }
}