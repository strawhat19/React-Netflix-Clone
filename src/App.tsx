import React from 'react';
import Main from './components/Main/main';
import './sass/App.css';
// import $ from 'jquery';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        React Netflix Clone
        <Main />
      </div>
    );  
  }
}