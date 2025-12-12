import './styles/auth.css';

import * as React from 'react';
import { Button } from '@mui/material';
import { useEffect, useRef } from 'react';

const GetStarted: React.FC<State> = ({email, setEmail}) => {

    const emailInput: any = useRef();
    // const isUser = (user: any, email: string) => user != null && user?.email?.toLowerCase() === email?.toLowerCase();

    useEffect(() => {
        const nextButton: any = document.querySelector(`.react-Slidy-next`);
        document.querySelector(`.emailForm`)?.addEventListener(`submit`, event => {
            event.preventDefault();
            let emailVal = emailInput?.current?.value;
            setEmail(emailVal);
            // const getUser: any = localStorage.getItem(`Last User`);
            // const lastUser = JSON.parse(getUser);
            // const userSigningIn = isUser(lastUser, emailVal);
            // if (userSigningIn) {
                localStorage.setItem(`Email`, emailVal);
            // }
            nextButton?.click();
            const password: any = document.querySelector(`input[type="password"]`);
            password?.focus();
        })
    }, [email, setEmail, emailInput])

    return (
        <div className='getStarted'>
            <h1 className={`authHeader`}>
                Unlimited films, TV programs and more.
            </h1>
            <h2>
                Watch anywhere. Cancel at any time.
            </h2>
            <h3>
                Ready to watch? Enter your email to create or restart your membership.
            </h3>

            <form action="" id='emailForm' className="emailForm getStartedForm">
                <input ref={emailInput} type="email" className="email" placeholder="Email Address" />
                <Button title="Get Started"
                    className='formButton getStartedButton'
                    type='submit'
                    style={{
                        color: `white`,
                        fontWeight: `500`,
                        textTransform: `none`,
                    }}>
                        <i className="fas fa-play"></i> GET STARTED
                </Button>
            </form>
        </div>
    )
}

export default GetStarted