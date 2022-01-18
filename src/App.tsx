import * as React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/home';
import MyList from './components/MyList/mylist';
import Auth from './components/Auth/auth';
import './sass/App.css';
  
const App:React.FC = () => {
  // const getUser:string = localStorage.getItem(`User`) || ``;
  // const parseUser:any = JSON.parse(getUser);
  const [user, setUser] = useState<any>(null);

    useEffect(() => {
      console.log(`user`,user);
    },[user])

    return (
      <div className="App">
          <BrowserRouter>
            {!user ? (
              <Auth user={user} setUser={setUser} />
            ) : (
              <Routes>
                <Route path="/" element={<Home user={user} setUser={setUser} />} />
                <Route path="/my-list" element={<MyList user={user} setUser={setUser} />} />
                <Route path={ `/registration` || `/auth` || `/signup` || `/login` || `/signin` || `/register` || `/log-in` || `/sign-up` || `/sign-in` } element={<Auth user={user} setUser={setUser} />} />
              </Routes>
            )}
               
          </BrowserRouter>
        </div>
  );  
}


export default App