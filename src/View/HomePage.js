// HomePage.js
import React, { useState, useEffect } from "react";
import BasicPageForm from "./CategoryPage/BasicPage";
import LeftCategories from "./leftCategories";
import BookInfo from "./bookInfo";
import { useNavigate } from 'react-router-dom';


function HomePage({ isLoggedIn, setLoginStatus }) {
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");
  const [isClickedSignUp, setClickedSignUp] = useState(false);

  const navigate = useNavigate();

  // app.jss 에서 전파
  const handlebookidOnHP = (bookId) => {
    navigate(`/bookinfo/${bookId}`);
  }


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  }

  const handleBookClick = (bookId) => {
    console.log("in");
    // 이동
    navigate('/bookinfo/${bookId}');
  }
  const resetToInitialState = () => {
    setSelectedCategory("주간 인기 책");
    setClickedSignUp(false);
  };

  return (
    <div style={{ height: "1024px", width: "1920px" }}>
      <LeftCategories
        onCategoryChange={handleCategoryChange}
        onLogoClick={resetToInitialState}
      />{" "}
      {/* onLogoClick prop 전달 */}
      <div
        style={{
          position: "absolute",
          left: 305,
          width: "100%",
          top: 0,
        }}
      >

        <BasicPageForm
          title={selectedCategory}
          onBookClick={handleBookClick}
          isLoggedIn={isLoggedIn}
          setLoginStatus={setLoginStatus}
          setClickedSignUp={setClickedSignUp}
          isClickedSignUp={isClickedSignUp}
          setbookidBP={handlebookidOnHP}
        />


      </div>
    </div>
  );
}

export default HomePage;
