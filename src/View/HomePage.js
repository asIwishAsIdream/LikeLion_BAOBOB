// HomePage.js
import React, { useState } from "react";
import CategoryListLeft from "./leftCategories";
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
import logo from "../image/Ellipse 1.png";
import mainTitle from "../image/Eternal Library.png";
import line1 from "../image/line1.png";

function HomePage() {
  const category_title = [
    "인문",
    "사회",
    "교육",
    "공학",
    "자연",
    "의약",
    "예체능",
    "융복합",
  ];
  // 카테고리 선택을 위한 Dictionary
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
  };

  // Add a state for the selected category
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");

  // Handler for category selection
  // 여기서 category는 임시 변수로 클릭이 발생했을 때 생긴다, 그리고 클릭시 클릭된 컴포넌트의 이름이 인자로 전달된다
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    console.log(category);
  };

  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent the default link click action
    handleCategoryClick("주간 인기 책");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", width: "1920px" }}>
      {/* 왼쪽 카테고리 리스트 관련 코드 */}
      <div
        style={{
          position: "absolute",
          width: 305,
          borderRight: "1px solid rgba(219, 219, 219, 1)",
          height: "100%",
        }}
      >
        <div
          style={{
            display: "block",
            flexDirection: "column",
            alignItems: "flex-start",
            width: 305,
            textAlign: "left",
            overflow: "hidden",
            paddingBottom: "10px",
          }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ position: "absolute", left: 85, top: 43 }}
          />

          <img
            src={mainTitle}
            alt="Eternal Library"
            style={{ position: "absolute", left: 57, top: 152 }}
          />
        </div>

        <img
          src={line1}
          alt="line1"
          style={{ position: "absolute", left: 0, top: 218.5 }}
        />
        <div
          style={{
            width: 305,
            textAlign: "left",
            position: "absolute",
            top: 236,
            left: 38,
          }}
        >
          <CategoryListLeft
            categories={["주간 인기 책"]}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <img
          src={line1}
          alt="line1"
          style={{ position: "absolute", left: 0, top: 309 }}
        />
        <br />
        <div
          style={{
            position: "absolute",
            left: 38,
            top: 324,
            display: "block",
            width: 305,
            textAlign: "left",
          }}
        >
          <CategoryListLeft
            categories={category_title}
            style={{ fontFamily: "category_other" }}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>
        <br />
        <img
          src={line1}
          alt="line1"
          style={{ position: "absolute", left: 0, top: 772 }}
        />
        <div
          style={{
            position: "absolute",
            left: 38,
            top: 812,
            display: "block",
            width: 305,
            textAlign: "left",
          }}
        >
          <CategoryListLeft
            categories={[`고객센터`]}
            selectedCategory={selectedCategory}
            onCategoryClick={handleCategoryClick}
          />
        </div>
      </div>
      {/* 왼쪽 카테고리 리스트 관련 코드 */}

      {/* 오른쪽 화면 관련 코드 */}
      <div
        style={{
          position: "absolute",
          left: 305,
          width: "100%",
        }}
      >
        {React.createElement(categoryComponentMap[selectedCategory], {
          title: selectedCategory,
        })}
      </div>

      {/* 오른쪽 화면 관련 코드 */}
    </div>
  );
}

export default HomePage;
