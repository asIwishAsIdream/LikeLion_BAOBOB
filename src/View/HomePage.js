// HomePage.js
import React, { useState, useEffect } from "react";
import BasicPageForm from "./CategoryPage/BasicPage";
import LeftCategories from "./leftCategories";

function HomePage({ isLoggedIn, setLoginStatus }) {
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");
  const [isClickedSignUp, setClickedSignUp] = useState(false);


  useEffect(() => {
    checkLoginStatus();  // 컴포넌트가 마운트될 때 로그인 상태 확인
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const resetToInitialState = () => {
    setSelectedCategory("주간 인기 책");
    setClickedSignUp(false);
  };

  const checkLoginStatus = () => {
    const token = localStorage.getItem('userToken');
    if (token) {
      setLoginStatus(true); // 사용자가 로그인 상태
      console.log(token);
    } else {
      setLoginStatus(false); // 사용자가 로그아웃 상태
    }
  }

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
          isLoggedIn={isLoggedIn}
          setLoginStatus={setLoginStatus}
        />
      </div>
    </div>
  );
}

export default HomePage;
