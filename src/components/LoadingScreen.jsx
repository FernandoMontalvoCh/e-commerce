import React from 'react';
import '../styles/loadingScreen.css'
import { Spinner } from "react-bootstrap";

const LoadingScreen = () => {
    return (
        <div className='overlay'>
            <Spinner animation="border" role="status" />
            
        </div>
    );
};

export default LoadingScreen;<h1>Loading...</h1>