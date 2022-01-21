import * as React from 'react';
import { Button } from '@mui/material';
import { capitalizeWord } from '../../App';
import { useEffect } from 'react';

const Registration:React.FC<State> = ({user, setUser, email}) => {

    const username:any = email?.substring(0, email.indexOf("@"));

    useEffect(() => {

        if (user?.list?.length > 0) console.log(`List`, user?.list);

        const backButton:any = document.querySelector(`.react-Slidy-prev`);
        
        document.querySelector(`.backButton`)?.addEventListener(`click`, (event:any) => {
            backButton?.click();
        })

        document.querySelector(`.emailField`)?.addEventListener(`keydown`, (event:any) => {
            if (event?.keyCode === 8) backButton?.click();
        })

        document.querySelector(`#registerForm`)?.addEventListener(`submit`, event => {
            event.preventDefault();
            if (username?.length === 0) {
                alert(`Please Enter A Valid Email Address`);
                return
            } else {
                const getUser:any = localStorage.getItem(`Last User`);
                const lastUser = JSON.parse(getUser);
               if (email === lastUser?.email) {
                const oldUser = {
                    email,
                    username,
                    password: lastUser?.password,
                    list: lastUser?.list
                  }
                console.log(`Old User`, oldUser);
                setUser(oldUser);
               } else {
                   const password:any = document.querySelector(`input[type="password"]`);
                   const newUser:any = {
                    email: email,
                    username: username,
                    password: password?.value,
                    list: [],
                }
                console.log(`New User`, newUser);
                localStorage.setItem(`Last User`, JSON.stringify(newUser));
                setUser(newUser);
               }
            }
        })


    }, [user])

    return (
        <div className='registration'>
            <h1 className={`authHeader`}>Welcome, {capitalizeWord(username)}.</h1>
            <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
            <form action="" className="regForm authForm" id='registerForm'>
                <input type="email" className="emailField" placeholder="Email Address" value={email} />
                <input type="password" className="password" placeholder="Password" />
                <Button title="Register" className='formButton registerButton' type='submit'
                    style={{
                        color: `white`,
                        textTransform: `none`,
                        fontWeight: `500`
                    }}>
                        <i className="fas fa-user-plus"></i> Register
                </Button>
            </form>
            <Button title="Back" className='backButton'
                style={{
                    color: `white`,
                    textTransform: `none`,
                    fontWeight: `500`
                }}>
                    <i className="fas fa-arrow-circle-left"></i>
                    <div className="buttonText">Back</div>
            </Button>
        </div>
    )
}

export default Registration