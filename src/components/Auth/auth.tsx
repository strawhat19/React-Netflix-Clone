import * as React from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Signup from '../SignUpForm/signup';
import { removeDuplicateObjFromArray } from '../Banner/banner';
import './styles/auth.css';

const Auth:React.FC<State> = ({user, setUser, list, setList, state, setState, movie, setMovie}) => {

    const stateObj = {
        user,
        list,
        movie,
        setUser,
        setList,
        setMovie,
    }

    const newUser = (email?:any, user?:any) => {

        const username:any = email?.substring(0, email.indexOf("@"));

        if (username.length === 0) {
            alert(`Please Enter A Valid Email Address`);
            return
        } else {
           if (username === state?.user?.username) {
            console.log(`Old User`);
              setList(removeDuplicateObjFromArray(state?.user?.list));
              setUser({
                  email: state?.user?.email,
                  username: state?.user?.username,
                  list: removeDuplicateObjFromArray(state?.user?.list)
              })
              setState({
                  ...stateObj,
            })
           } else {
            console.log(`New User`);
            setList([]);
            setUser({
                email,
                username,
                list,
            });
            setState({
                ...stateObj,
            })
            localStorage.setItem(`User`, JSON.stringify(user));
            localStorage.setItem(`List`, JSON.stringify(list));
           }
        }

    }

    useEffect(() => {
        const authForm = document.querySelector(`.authForm`);
        authForm?.addEventListener(`submit`, event => {
            event.preventDefault();
            const email:any = document.querySelector(`input`)?.value;
            newUser(email, user);
        })
    }, [])

    return (
        <>
        <Header user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
        <main className="auth">
            <div className="innerAuth">
                {!user ? (
                    <div className="initialAuth">
                        <h1 className={`authHeader`}>Unlimited films, TV programs and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <form action="" className="authForm">
                            <input type="email" className="email" placeholder="Email Address" />
                            <Button title="Get Started"
                                className='formButton'
                                type='submit'
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `500`
                                }}>
                                    <i className="fas fa-play"></i> GET STARTED
                            </Button>
                        </form>
                    </div>
                ) : (
                    <Signup user={user} setUser={setUser} list={list} setList={setList} state={state} setState={setState} movie={movie} setMovie={setMovie} />
                )}
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Auth