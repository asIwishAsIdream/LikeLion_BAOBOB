import React from 'react';

function BookCard({ book, onBookClick, setbookid }) {

    // app.jss 에서 전파
    const handlebookid = (booid) => {
        setbookid(booid);
    }

    return (
        <div onClick={() => {
            handlebookid(book.book_id)
        }} style={{ width: '188px', padding: '8px', margin: '5px', textAlign: 'left', cursor: 'pointer' }}>
            {/* <img src={book.image} alt={book.title} style={{ width: '188px', height: '282.99px' }} /> */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '7px' }}>
                <span style={{ border: '1px solid skyblue', color: 'skyblue', marginRight: '10px', width: '60px', height: '25px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{book.expirationYear}</span>
                <span style={{ border: '1px solid blue', color: 'blue', width: '60px', height: '25px', borderRadius: '5px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{book.expiration}</span>
            </div>
            <h2 style={{ fontWeight: 700, fontSize: '20px', marginTop: '10px', marginBottom: '0' }}>{book.title}</h2>
            <h3 style={{ fontWeight: 600, color: 'gray', fontSize: '17px', marginTop: '7px', marginBottom: '0' }}>{book.author}</h3>
            <p style={{ marginTop: '7px', marginBottom: '0' }}>Rating: {book.rating}</p>
        </div>
    );
}

export default BookCard;
