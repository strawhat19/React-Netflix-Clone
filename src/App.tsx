import React from 'react';
import Header from './components/Header/header';
import './sass/App.css';
// import $ from 'jquery';

export default class App extends React.Component {
  componentDidMount(): void {
    // console.clear();

    const APIKey = `da9b0d504005e1243db4e403678fba18`;
    const requests = {
      trending: `hello`
    }

    const getMovie = async () => {
      const response = await fetch(`https://api.themoviedb.org/3/movie/550?api_key=${APIKey}`);
      const data = await response.json();
      console.log(data);
      return data;
    }

    getMovie();
  }
  render() {
    return (
      <div className="App">
        <Header />
      </div>
    );  
  }
}