import * as React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/home';
import MyList from './components/MyList/mylist';
import Auth from './components/Auth/auth';
import './sass/App.css';
  
const App:React.FC = () => {

  const [user, setUser] = useState<any>(null);

    useEffect(() => {
      // Fade Body In
      // $(`body`).hide().fadeIn(1000);
      console.log(`user`,user);
    },[user])

    return (
      <div className="App">
          <Router>
            {!user ? (
              <Auth />
            ) : (
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/my-list" element={<MyList />} />
                <Route path={ `/registration` || `/auth` || `/signup` || `/login` || `/signin` || `/register` || `/log-in` || `/sign-up` || `/sign-in` } element={<Auth />} />
              </Routes>
            )}
               
          </Router>
        </div>
  );  
}


export default App