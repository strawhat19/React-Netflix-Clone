import * as React from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import './styles/auth.css';

const GetStarted:React.FC<State> = ({email, setEmail}) => {

    useEffect(() => {
        const nextButton:any = document.querySelector(`.react-Slidy-next`);
        const emailInput:any = document.querySelector(`input.email`);

        document.querySelector(`.emailForm`)?.addEventListener(`submit`, event => {
            event.preventDefault();
            setEmail(emailInput?.value);
            nextButton?.click();
        })
    }, [email, setEmail])

    return (
        <div className='getStarted'>
            <h1 className={`authHeader`}>Unlimited films, TV programs and more.</h1>
            <h2>Watch anywhere. Cancel at any time.</h2>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <form action="" id='emailForm' className="emailForm">
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
    )
}

export default GetStarted