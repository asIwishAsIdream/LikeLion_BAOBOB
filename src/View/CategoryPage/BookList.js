// BookList.js
import React, { useState } from 'react';
import jsonData from './json.json';
import BookCard from './BaseBookCover';

function BookCardListPage({ onBookClick, setbookidBL }) {
    const transformedData = jsonData.map(book => ({
        image: book.book_cover.book_cover,
        book_id: book.book_id,
        title: book.book_name,
        author: book.author,
        expiration: "기증",
        expirationYear: book.publication_year,
        rating: book.average_rating
    }));

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;
    const totalPages = Math.ceil(transformedData.length / cardsPerPage);
    const currentData = transformedData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);
    // app.jss 에서 전파
    const handlebookidOnBLP = (booid) => {
        setbookidBL(booid);
    }
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ position: 'absolute', left: '89.5px', top: '235px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '66px', width: '1324px', height: '947px' }}>
                {currentData.map((book, index) => (
                    <BookCard
                        key={index}
                        book={book}
                        onBookClick={onBookClick} // When a book is clicked, its ID is passed to the parent component
                        setbookid={handlebookidOnBLP}
                    />
                ))}
            </div>
            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', bottom: '60px', width: '100%' }}>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => paginate(i + 1)}
                        style={{
                            border: 'none',
                            cursor: 'pointer',
                            padding: '5px 10px',
                            margin: '0 5px',
                            marginTop: '40px',
                            marginBottom: '50px',
                            backgroundColor: 'transparent',
                            fontWeight: i + 1 === currentPage ? 'bold' : 'normal'
                        }}>
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default BookCardListPage;
