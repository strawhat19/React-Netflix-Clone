import * as React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home/home';
import Auth from './components/Auth/auth';
import './sass/App.css';
import TVShows from './components/TVShows/tvshows';
import Movies from './components/Movies/movies';
import MyList from './components/MyList/mylist';
import Latest from './components/Latest/latest';
  
const App:React.FC = () => {
  
  const getUser:any = localStorage.getItem(`User`);
  const parseUser:any = JSON.parse(getUser);
  const [user, setUser] = useState<any>(parseUser);

    useEffect(() => {
      console.log(`user`,user);
      localStorage.setItem(`User`, JSON.stringify(user));
    },[user])

    return (
      <div className="App">
          <BrowserRouter>
            {!user ? (
              <Auth user={user} setUser={setUser} />
            ) : (
              <Routes>
                <Route path={`/`} element={<Home user={user} setUser={setUser} />} />
                <Route path={`/home`} element={<Home user={user} setUser={setUser} />} />
                <Route path={`/shows`} element={<TVShows user={user} setUser={setUser} />} />
                <Route path={`/tvshows`} element={<TVShows user={user} setUser={setUser} />} />
                <Route path={`/tv-shows`} element={<TVShows user={user} setUser={setUser} />} />
                <Route path={`/movies`} element={<Movies user={user} setUser={setUser} />} />
                <Route path={`/hot`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/new`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/latest`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/popular`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/trending`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/newpopular`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/new-popular`} element={<Latest user={user} setUser={setUser} />} />
                <Route path={`/list`} element={<MyList user={user} setUser={setUser} />} />
                <Route path={`/mylist`} element={<MyList user={user} setUser={setUser} />} />
                <Route path={`/my-list`} element={<MyList user={user} setUser={setUser} />} />
                <Route path={ `/auth`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/signin`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/sign-in`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/login`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/log-in`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/signup`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/sign-up`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/register`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/registration`} element={<Auth user={user} setUser={setUser} />} />
                <Route path={ `/authorization`} element={<Auth user={user} setUser={setUser} />} />
              </Routes>
            )}
               
          </BrowserRouter>
        </div>
  );  
}


export default App