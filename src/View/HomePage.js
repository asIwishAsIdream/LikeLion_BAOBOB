// HomePage.js
import React, { useState } from "react";
import BasicPageForm from "./CategoryPage/BasicPage";
import LeftCategories from "./leftCategories";
import BookInfo from "./bookInfo";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBookId(null);  // Reset selected book when changing category
  }

  const handleBookClick = (bookId) => {
    console.log("in");
    setSelectedBookId(bookId);
  }

  return (
    <div style={{ height: "1024px", width: "1920px" }}>
      <LeftCategories onCategoryChange={handleCategoryChange} />

      <div
        style={{
          position: "absolute",
          left: 305,
          width: "100%",
          top: 0,
        }}
      >
        {selectedBookId ? <BookInfo bookId={selectedBookId} /> : <BasicPageForm title={selectedCategory} onBookClick={handleBookClick} />}
      </div>
    </div>
  );
}

export default HomePage;
