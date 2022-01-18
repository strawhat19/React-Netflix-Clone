import * as React from 'react';
// import{useState, useEffect, useContext} from "react";
import ReactDOM from 'react-dom';
import App from './App';

declare global {
  namespace JSX {
      interface IntrinsicElements {
      'person-info': PersonInfoProps
      }
  }
}

interface PersonInfoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> {
  heading: string,
  subHeading: string,
  size?: string
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);