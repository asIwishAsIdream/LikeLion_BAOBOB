import React, { useState, useEffect } from "react";
import MypageLeftCategories from "./myPageLeftCategories";
import NickNameChange from "./nicknameChange";
import Annotation from "./annotation";
import AverageScore from "./averageScore";
import Comments from "./comments";
import BookMark from "./bookMark";
import LikeBook from "./likeBook";
import ReadingBook from "./readingBook";

function MyPage() {
    const [selectedCategory, setSelectedCategory] = useState("닉네임 변경"); // 기본값을 "닉네임 변경"으로 설정

    const handleMypageCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    const renderCategoryComponent = () => {
        switch (selectedCategory) {
            case "닉네임 변경":
                return <NickNameChange />;
            case "읽고 있는 책":
                return <ReadingBook />;
            case "좋아하는 책":
                return <LikeBook />;
            case "북마크":
                return <BookMark />;
            case "평점":
                return <AverageScore />;
            case "댓글":
                return <Comments />;
            case "주석":
                return <Annotation />;
            default:
                return <NickNameChange />;
        }
    }

    return (
        <div style={{ height: "1024px", width: "1920px" }}>
            <MypageLeftCategories onMypageCategoryChange={handleMypageCategoryChange} />
            <div>
                {renderCategoryComponent()}  {/* 조건에 따라 다른 컴포넌트 렌더링 */}
            </div>
        </div>
    );
}

export default MyPage;
