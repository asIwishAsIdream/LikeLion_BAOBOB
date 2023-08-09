// HomePage.js
import React, { useState } from "react";
import {
  WeeklyPopularBooks,
  HumanitiesBooks,
  Arts_SportsBooks,
  ConvergenceBooks,
  SocietyBooks,
  NatureBooks,
  MedicineBooks,
  EducationBooks,
  EngineeringBooks,
  CustomerService,
} from "./MBooksCategory"; // index.js를 사용해서 이렇게 됨
import LeftCategories from "./LeftCategories";

function HomePage() {
  const categoryComponentMap = {
    "주간 인기 책": WeeklyPopularBooks,
    인문: HumanitiesBooks,
    교육: EducationBooks, // 오타 수정(EducationBoosk -> EducationBooks)
    사회: SocietyBooks,
    공학: EngineeringBooks,
    자연: NatureBooks,
    의약: MedicineBooks,
    예체능: Arts_SportsBooks,
    융복합: ConvergenceBooks,
    고객센터: CustomerService, // 예시로 추가
  }; // Add a state for the selected category

  // Handler for category selection
  // 여기서 category는 임시 변수로 클릭이 발생했을 때 생긴다, 그리고 클릭시 클릭된 컴포넌트의 이름이 인자로 전달된다

  return (
    <div style={{ display: "flex", minHeight: "1024px", width: "1920px" }}>
      {/* 왼쪽 카테고리 리스트 관련 코드 */}
      <LeftCategories />

      {/* 오른쪽 화면 관련 코드 */}
      <div
        style={{
          position: "absolute",
          left: 305,
          width: "100%",
        }}
      >
        {React.createElement(categoryComponentMap["주간 인기 책"], {
          title: "주간 인기 책",
        })}
      </div>

      {/* 오른쪽 화면 관련 코드 */}
    </div>
  );
}

export default HomePage;
