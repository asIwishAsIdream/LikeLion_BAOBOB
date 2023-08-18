// BookList.js
import BookCard from './BaseBookCover';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookCardListPage() {
    const [booksData, setBooksData] = useState([]); // 서버로부터 받아온 데이터를 저장할 상태

    const serverUrl = "/library/";

    useEffect(() => {
        axios.get(serverUrl)
            .then((response) => {
                const transformedData = response.data.map(book => ({
                    image: book.book_cover.book_cover,
                    book_id: book.book_id,
                    title: book.book_name,
                    author: book.author,
                    expiration: "기증",
                    expirationYear: book.publication_year,
                    rating: book.average_rating
                }));

                setBooksData(transformedData); // 변환된 데이터를 상태에 저장
            })
            .catch((error) => {
                console.error("There was a problem with the request:", error);
            });
    }, []); // useEffect를 사용하여 컴포넌트 마운트 시 한 번만 서버 요청

    const [currentPage, setCurrentPage] = useState(1);
    const cardsPerPage = 10;
    const totalPages = Math.ceil(booksData.length / cardsPerPage);
    const currentData = booksData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ position: 'absolute', left: '89.5px', top: '235px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '66px', width: '1324px', height: '947px' }}>
                {currentData.map((book, index) => (
                    <BookCard
                        key={index}
                        book={book}
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