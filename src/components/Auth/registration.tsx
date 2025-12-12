import * as React from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { capitalizeWord, logs, pageName } from '../../App';

const Registration: React.FC<State> = ({user, setUser, email}) => {

    const getEmail: any = localStorage.getItem(`Email`);
    const username: any = email?.substring(0, email.indexOf(`@`));

    const isUser = (user: any, email: string) => {
        let lcEmail = email?.toLowerCase();
        let returningUser = lcEmail === getEmail?.toLowerCase();
        let userIsSigningIn = user != null && lcEmail === user?.email?.toLowerCase();
        console.log(`isUser`, { userIsSigningIn, returningUser, user, email, getEmail });
        return userIsSigningIn || returningUser;
    }

    useEffect(() => {
        if (user?.list?.length > 0) console.log(`List`, user?.list);

        const backButton: any = document.querySelector(`.backButton`);
        const emailField: any = document.querySelector(`.emailField`);
        const eMail: any = document.querySelector(`input[type="email"]`);
        const registerForm: any = document.querySelector(`#registerForm`);
        const password: any = document.querySelector(`input[type="password"]`);
        const prevSlideButton: any = document.querySelector(`.react-Slidy-prev`);

        if (backButton) {
            backButton?.addEventListener(`click`, (event: any) => {
                // const backButtons: any = document.querySelectorAll(`.backButton`);
                // const prevSlideButtons: any = document.querySelectorAll(`.react-Slidy-prev`);
                // console.log(`Back Button Click`, {backButton, prevSlideButton, eMail, prevSlideButtons, backButtons});
                if (prevSlideButton) prevSlideButton?.click();
                if (eMail) eMail?.focus();
            })
        }

        if (password) {
            password?.addEventListener(`keydown`, (event: any) => {
                if (!password?.value) {
                    if (event?.keyCode === 8) {
                        if (prevSlideButton) prevSlideButton?.click();
                        if (eMail) eMail?.focus();
                    }
                }
            })
        }

        if (emailField) {
            emailField?.addEventListener(`keydown`, (event: any) => {
                if (event?.keyCode === 8) {
                    if (prevSlideButton) prevSlideButton?.click();
                    if (eMail) eMail?.focus();
                }
            })
        }

        if (registerForm) {
            registerForm?.addEventListener(`submit`, (event: any) => {
                event.preventDefault();
                if (username?.length === 0) {
                    alert(`Please Enter A Valid Email Address`);
                    return;
                } else {
                    const getUser: any = localStorage.getItem(`Last User`);
                    const lastUser = JSON.parse(getUser);
                    if (email === lastUser?.email) {
                        const oldUser = {
                            email,
                            username,
                            list: lastUser?.list,
                            password: lastUser?.password,
                        }
                        logs && console.log(`Old User`, oldUser);
                        setUser(oldUser);
                        if (pageName === `signin` || pageName === `signup`) window.location.href = `/`;
                    } else {
                        const passWord: any = document.querySelector(`input[type="password"]`);
                        const newUser: any = {
                            email,
                            username,
                            list: [],
                            password: passWord?.value,
                        }
                        logs && console.log(`New User`, newUser);
                        localStorage.setItem(`Last User`, JSON.stringify(newUser));
                        setUser(newUser);
                        if (pageName === `signin` || pageName === `signup`) window.location.href = `/`;
                    }
                }
            })
        }
    }, [user, email, setUser, username])

    return (
        <div className='registration'>
            <h1 className={`authHeader`}>
                Welcome, {capitalizeWord(username)}.
            </h1>
            <h3>
                Ready to watch? Enter your email to create or restart your membership.
            </h3>
            <form action="" className="regForm authForm" id='registerForm'>
                <input type="email" className="emailField" placeholder="Email Address" defaultValue={email} />
                <input type="password" className="password passwordField" placeholder="Password" />
                <Button title={`${isUser(user, email) ? `Sign In` : `Sign Up`}`} className='formButton registerButton' type='submit'
                    style={{
                        color: `white`,
                        fontWeight: `500`,
                        textTransform: `none`,
                    }}>
                        <i className="fas fa-user-plus"></i> {isUser(user, email) ? `Sign In` : `Sign Up`}
                </Button>
            </form>
            <Button title="Back" className='backButton'
                style={{
                    color: `white`,
                    fontWeight: `500`,
                    textTransform: `none`,
                }}>
                    <i className="fas fa-arrow-circle-left"></i>
                    <div className="buttonText">
                        Back
                    </div>
            </Button>
        </div>
    )
}

export default Registration