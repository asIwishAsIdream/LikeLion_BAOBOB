// Content.js
import React from 'react';
import BasicPageForm from '../CategoryPage/BasicPage';

function MedicineBooks({ title }) {
    return (
        <div>
            <BasicPageForm title={title}></BasicPageForm>
        </div>
    );
}

export default MedicineBooks;
