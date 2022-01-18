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
      console.log(`user`,user);
    },[user])

    return (
      <div className="App">
          <Router>
            {!user ? (
              <Auth user={user} setUser={setUser} />
            ) : (
              <Routes>
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
                <Route path="/my-list" element={<MyList user={user} setUser={setUser} />} />
                <Route path={ `/registration` || `/auth` || `/signup` || `/login` || `/signin` || `/register` || `/log-in` || `/sign-up` || `/sign-in` } element={<Auth user={user} setUser={setUser} />} />
              </Routes>
            )}
               
          </Router>
        </div>
  );  
}


export default App