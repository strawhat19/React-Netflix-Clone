import * as React from 'react';
// import { useState } from 'react';
import './styles/signup.css'
import { Button } from '@mui/material';

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

const Signup:React.FC<Props> = ({user, setUser}) => {

    return (
        <>
        {user ? (
            <div className="signIn">
                Sign In Form
                <form action="" className="authForm">
                        <input type="email" className="email" placeholder="Email Address" />
                        <Button title="Sign In"
                            className='formButton'
                            onClick={() => {
                                // On Form Submit Code
                            }}
                            style={{
                                color: `white`,
                                textTransform: `none`,
                                fontWeight: `500`
                            }}>
                                SIGN IN
                        </Button>
                    </form>
            </div>
        ) : (
            <div className="signup">
                Sign Up Form
                <form action="" className="authForm">
                        <input type="email" className="email" placeholder="Email Address" />
                        <Button title="Sign Up"
                            className='formButton'
                            onClick={() => {
                                // On Form Submit Code
                            }}
                            style={{
                                color: `white`,
                                textTransform: `none`,
                                fontWeight: `500`
                            }}>
                                SIGN UP
                        </Button>
                    </form>
            </div>
        )}
        </>
    )
}

export default Signup