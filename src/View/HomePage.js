// HomePage.js
import React, { useState } from "react";
import BasicPageForm from "./CategoryPage/BasicPage";
import LeftCategories from "./leftCategories";
import BookInfo from "./bookInfo";

function HomePage() {
  // Add a state for the selected category
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");

  // Handler for category selection
  // 여기서 category는 임시 변수로 클릭이 발생했을 때 생긴다, 그리고 클릭시 클릭된 컴포넌트의 이름이 인자로 전달된다

  return (
    <div style={{ height: "1024px", width: "1920px" }}>
      {/* 왼쪽 카테고리 리스트 관련 코드 */}
      <LeftCategories />

      {/* 오른쪽 화면 관련 코드 */}
      <div
        style={{
          position: "absolute",
          left: 305,
          width: "100%",
          top: 0,
        }}
      >
        <BookInfo />
      </div>

      {/* 오른쪽 화면 관련 코드 */}
    </div>
  );
}

export default HomePage;
