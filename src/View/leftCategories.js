import React from "react";
import styled from "styled-components";
import rectangleBox from "../image/Rectangle 3.png";
import "./Fonts.css";

const Title = styled.a`
  display: block;
  padding-left: 21px; // 글씨에 대한 왼쪽 패딩
  text-decoration: none;

  margin-top: 10px;
  font-size: 22px; // 폰트 사이즈 설정
  font-family: "SDB";
  
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
    font-family: SDB;
  `}
`;

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

export default CategoryListLeft;
