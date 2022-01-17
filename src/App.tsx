import * as React from 'react';
import {Suspense, lazy , useState, useEffect, useContext} from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './sass/App.css';
import Home from './components/Home/home';
// import $ from 'jquery';
  
  export default class App extends React.Component {
    render() {
      return (
        <div className="App">
          <Home />
            <BrowserRouter>
                  <Routes>
                      <Route path="/" element={<Home />} />
                  </Routes>
            </BrowserRouter>
          </div>
    );  
  }
}