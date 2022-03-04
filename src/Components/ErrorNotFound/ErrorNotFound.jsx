import React from 'react';
import { Link } from 'react-router-dom';

const ErrorNotFound = () => {
    return (
        <div className="fully-center">
            <div align="center">
                <h1>
                    Error 404 Page Not found
                </h1>
                <br />
                <img src="./images/svgs/character_lappy.svg" alt="character-svg" style={{ maxWidth: '300px' }} />
                <Link to="/"><h1 style={{ color: 'pink' }}>Go to Home</h1></Link>
            </div>
        </div>
    );
}

export default ErrorNotFound;