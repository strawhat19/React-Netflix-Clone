import * as React from 'react';
import{useState, useEffect} from "react";
import "./styles/topButton.css";

const TopButton: React.FC = () => {

    const [show, setShow] = useState<any>(false);

    const showButton = () => {
        if (window.scrollY > 100) {
            setShow(true);
        } else {
            setShow(false);
        }
    }

    const scrollTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    useEffect(() => {
        window.addEventListener(`scroll`, event => {
            showButton();
            return () => window.removeEventListener(`scroll`, event => {
                showButton();
            })
        })
    }, [])

    return (
        <button className={show ? `visibleButton` : `hiddenButton`} onClick={() => scrollTop()} id="topButton" title="Scroll to top">&gt;</button>
    )
}

export default TopButton