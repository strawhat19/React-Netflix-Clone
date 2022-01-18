import * as React from 'react';
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './components/Home/home';
import Auth from './components/Auth/auth';
import './sass/App.css';
import TVShows from './components/TVShows/tvshows';
import Movies from './components/Movies/movies';
import MyList from './components/MyList/mylist';
import Latest from './components/Latest/latest';

declare global { 
  interface State {
    user?: any,
    setUser?: any,
    state?: any,
    setState?: any,
    bannerMovie?: any,
    [key: string]: any
  }
  interface Banner {
    user?: any,
    setUser?: any,
    fetchMovie?: any,
    bannerMovie?: any,
    movies?: any,
    state?: any,
    setState?: any,
    [key: string]: any
  }
  interface Row {
    user?: any,
    setUser?: any,
    title: string,
    movieURL: string,
    state?: any,
    setState?: any,
    [key: string]: any
  }
}
  
const App:React.FC = () => {
  
  const getUser:any = localStorage.getItem(`User`);
  // const getState:any = localStorage.getItem(`State`);
  const [user, setUser] = useState<any>(JSON.parse(getUser));
  const [state, setState] = useState<any>([user]);

    useEffect(() => {
      setUser(user);
      setState([user]);
      const list = user?.list || [];
      console.log(`user`,user);
      console.log(`state`,state);
      console.log(`list`,list);
      localStorage.setItem(`User`, JSON.stringify(user));
      localStorage.setItem(`List`, JSON.stringify(list));
      localStorage.setItem(`State`, JSON.stringify(state));
    },[user])

    return (
      <div className="App">
          <Router>
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
          </Router>
        </div>
  );  
}


export default App