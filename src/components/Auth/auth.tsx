import * as React from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Signup from '../SignUpForm/signup';
import { removeDuplicateObjFromArray } from '../../App';
import './styles/auth.css';

const Auth:React.FC<State> = ({user, setUser, movie, setMovie}) => {

    useEffect(() => {
        const authForm = document.querySelector(`.authForm`);
        authForm?.addEventListener(`submit`, event => {
            event.preventDefault();
            const email:any = document.querySelector(`input`)?.value;
            const username:any = email?.substring(0, email.indexOf("@"));
            if (username.length === 0) {
                alert(`Please Enter A Valid Email Address`);
                return
            } else {
               if (username === user?.username) {
                console.log(`Old User`);
                  setUser({
                      email: user?.email,
                      username: user?.username,
                      list: removeDuplicateObjFromArray(user?.list)
                  })
               } else {
                console.log(`New User`);
                setUser({
                    email: email,
                    username: username,
                    list: [],
                });
               }
            }
        })
    }, [user])

    return (
        <>
        <Header user={user} setUser={setUser} movie={movie} setMovie={setMovie} />
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
                    <Signup user={user} setUser={setUser} movie={movie} setMovie={setMovie} />
                )}
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Auth