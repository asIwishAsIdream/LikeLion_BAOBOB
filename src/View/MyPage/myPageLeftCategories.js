import React, { useState } from "react";
import styled from "styled-components";
import rectangleBox from "../../image/Rectangle 3.png";
import { useNavigate } from 'react-router-dom';
import logo from "../../image/Ellipse 1.png";
import mainTitle from "../../image/Eternal Library.png";
import line1 from "../../image/line1.png";
import mypage from "../../image/mypage.png";
import ".././Fonts.css";

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

function MypageLeftCategories({ onMypageCategoryChange }) {
    const category_title = [
        "닉네임 변경",
        "읽고 있는 책",
        "좋아하는 책",
        "북마크",
        "평점",
        "댓글",
        "주석",
    ];

    const [selectedCategory, setSelectedCategory] = useState("닉네임 변경");

    const navigate = useNavigate();

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        onMypageCategoryChange(category); // <-- 카테고리 변경 시 부모 컴포넌트에 알림
    };

    const handleLogoClick = (e) => {
        e.preventDefault(); // Prevent the default link click action
        navigate("/");
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
                        style={{ position: "absolute", left: 85, top: 43, cursor: "pointer" }}
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
                        top: 257,
                        left: 60,
                    }}
                >
                    <img
                        src={mypage}
                        alt="mypage"
                    />
                </div>
                <img
                    src={line1}
                    alt="line1"
                    style={{ position: "absolute", left: 0, top: 309 }}
                />
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
                    <CategoryListMyPage
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
            </div>
        </div>
    );
}

function CategoryListMyPage({ categories, selectedCategory, onCategoryClick }) {
    return (
        <div>
            {categories.map((category) => (
                <CategoryTitle
                    key={category}
                    title={category}
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

export default MypageLeftCategories;
