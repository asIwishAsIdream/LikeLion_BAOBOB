import React, { useState } from "react";
import styled from "styled-components";
import rectangleBox from "../image/Rectangle 3.png";

import logo from "../image/Group 155.png";
import mainTitle from "../image/Eternal Library.png";
import line1 from "../image/line1.png";
import "./Fonts.css";

const Title = styled.a`
  display: block;
  padding-left: 21px; // 글씨에 대한 왼쪽 패딩
  text-decoration: none;

  margin-top: 12px;
  font-size: 22px; // 폰트 사이즈 설정

  // selected prop에 따라 스타일을 변경
  ${(props) =>
    props.selected &&
    `
    color: white;
    font-family: SDB;
    weight: 700;
    line-height: 41px;
    background-image: url(${rectangleBox});
    background-repeat: no-repeat;
  `}

  ${(props) =>
    props.others &&
    `
    color:#545454;
    weight: 600;
    
    line-height: 41px;
    font-family: SDSB;
  `}
`;

function LeftCategories({ onCategoryChange, onLogoClick }) {
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

  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    onCategoryChange(category); // <-- 카테고리 변경 시 부모 컴포넌트에 알림
  };

  const handleLogoClick = (e) => {
    e.preventDefault(); // Prevent the default link click action
    handleCategoryClick("주간 인기 책");
    onCategoryChange("주간 인기 책");
    if (onLogoClick) onLogoClick(); // 추가된 부분: HomePage.js의 상태를 초기화하는 콜백 함수 호출
  };

  return (
    <div>
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
            onClick={handleLogoClick}
            alt="logo"
            style={{
              position: "absolute",
              left: 38,
              top: 0,
              cursor: "pointer",
            }}
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
    </div>
  );
}

function CategoryListLeft({ categories, selectedCategory, onCategoryClick }) {
  return (
    <div>
      {categories.map((category) => (
        <CategoryTitle
          key={category}
          title={category}
          // selected prop 추가
          selected={selectedCategory === category}
          others={selectedCategory !== category}
          onClick={() => onCategoryClick(category)}
        />
      ))}
    </div>
  );
}

function CategoryTitle({ title, onClick, selected, others }) {
  return (
    <Title others={others} selected={selected} href="#" onClick={onClick}>
      {title}
    </Title>
  );
}

export default LeftCategories;
