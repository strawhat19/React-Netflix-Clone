import * as React from 'react';
import{useState, useEffect} from "react";
import "./styles/topButton.css";

const TopButton: React.FC<State> = () => {

    const [show, setShow] = useState<any>(false);

    const scrollTop = () => {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }

    const showButton = () => {
        if (window.scrollY > 50) {
            setShow(true);
        } else {
            setShow(false);
        }
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
        <button className={show ? `visibleButton iconButton` : `hiddenButton iconButton`} onClick={() => scrollTop()} id="topButton" title="Scroll to top">
            <span className="upArrow">
                &gt;
            </span>
        </button>
    )
}

export default TopButton