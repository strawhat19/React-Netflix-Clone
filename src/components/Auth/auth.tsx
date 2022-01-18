import * as React from 'react';
import { Button } from '@mui/material';
import { useEffect } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';
import Signup from '../SignUpForm/signup';
import './styles/auth.css'

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

const Auth:React.FC<Props> = ({user, setUser}) => {

    const newUser = (email?:any) => {
        const username = email?.substring(0, email.indexOf("@"));
        // const emailAfterstring = emailAddress?.replace(emailBeforeString+`@`,``);
        if (username.length === 0) {
            alert(`Please Enter Something Before The '@' Symbol As Well`)
            return
        } else {
            const userObj = {
                email,
                username,
                list: [],
            }
            setUser(userObj)
            localStorage.setItem(`User`, JSON.stringify(userObj));
        }
    }

    useEffect(() => {
        const authForm = document.querySelector(`.authForm`);
        authForm?.addEventListener(`submit`, event => {
            event.preventDefault();
            const email = document.querySelector(`input`)?.value;
                
            email?.includes(`@`) ? email?.length < 2 ? alert(`lease Enter An Email Address With More Characters`) : newUser(email) : alert(`Please Enter An Email Address With An '@' Symbol`);
        })
    }, [])

    return (
        <>
        <Header user={user} setUser={setUser} />
        <main className="auth">
            <div className="innerAuth">
                {!user ? (
                    <div className="initialAuth">
                        <h1 className={`authHeader`}>Unlimited films, TV programs and more.</h1>
                        <h2>Watch anywhere. Cancel at any time.</h2>
                        <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
                        <form action="" className="authForm">
                            <input type="email" className="email" placeholder="Email Address" />
                            <Button title="Sign Up"
                                className='formButton'
                                type='submit'
                                style={{
                                    color: `white`,
                                    textTransform: `none`,
                                    fontWeight: `500`
                                }}>
                                    GET STARTED
                            </Button>
                        </form>
                    </div>
                ) : (
                    <Signup />
                )}
            </div>
        </main>
        <Footer />
        </>
    )
}

export default Auth