import * as React from 'react';
import "./styles/customAvatar.css";
import { capitalize } from '../Header/header';

interface Props {
    user?: any,
    setUser?: any,
    [key: string]: any
}

const CustomAvatar: React.FC<Props> = ({user, setUser}) => {
    const firstUserLetter = user?.username[0];
    return (
        <>
        {user ? (
            <div className="customAvatar">
                <span className="avatarU">{capitalize(firstUserLetter)}</span>
            </div>
        ) : (
            <img alt="avatar" src="./assets/avatarEdit.svg" className="customAvatar" />
        )}
        </>    
    )
}

export default CustomAvatar
