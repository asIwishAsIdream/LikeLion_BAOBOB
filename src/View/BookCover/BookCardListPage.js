import React, { useState } from 'react';
import BasicPageForm from '../CategoryPage/BasicPage';
import BookCard from '../BookCover/BaseBookCover';

function BookCardListPage() {
    // 임시 데이터 생성
    const bookData = Array(10).fill({
        image: '/book_EX.jpg',
        title: "노인과바다",
        author: "최낙현",
        expiration: "기증",
        expirationYear: '2023',
        rating: 4.5 // 임시 평점
    });

    // 현재 페이지 상태
    const [currentPage, setCurrentPage] = useState(1);

    // 페이지당 보여줄 카드 수
    const cardsPerPage = 10;

    // 총 페이지 수
    const totalPages = Math.ceil(bookData.length / cardsPerPage);

    // 현재 페이지에 보여줄 데이터
    const currentData = bookData.slice((currentPage - 1) * cardsPerPage, currentPage * cardsPerPage);

    // 페이지 이동 함수
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{ position: 'absolute', left: '89.5px', top: '235px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '66px', width: '1324px', height: '947px' }}>
                {currentData.map((book, index) => <BookCard key={index} book={book}></BookCard>)}
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
