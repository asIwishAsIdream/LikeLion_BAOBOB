// Content.js
import React from 'react';

function CustomerService({ text, image }) {
    return (
        <div>
            <img src={image} alt="content" />
            <p>CustomerService</p>
        </div>
    );
}

export default CustomerService;
