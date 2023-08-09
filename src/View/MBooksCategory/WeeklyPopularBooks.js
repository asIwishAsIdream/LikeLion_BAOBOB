import React from "react";
import BasicPageForm from "../CategoryPage/BasicPage";
import BookCard from "../BookCover/BaseBookCover";
import BookCardListPage from "../BookCover/BookCardListPage";

function WeeklyPopularBooks({ title }) {
  const book = {
    image: "/book_EX.jpg",
    title: "노인과바다",
    author: "최낙현",
    expiration: "기증",
    expirationYear: "2023",
    rating: 4.5, // 임시 평점
  };

  return (
    <div>
      <BasicPageForm title={title}></BasicPageForm>
      <BookCardListPage></BookCardListPage>
    </div>
  );
}

export default WeeklyPopularBooks;
