import React, { useState, useEffect } from "react";
import MypageLeftCategories from "./myPageLeftCategories";
import NickNameChange from "./nicknameChange";
import Annotation from "./annotation";
import AverageScore from "./averageScore";
import Comments from "./comments";
import BookMark from "./bookMark";
import LikeBook from "./likeBook";
import ReadingBook from "./readingBook";
import axios from "axios";

function MyPage() {
    const [selectedCategory, setSelectedCategory] = useState("닉네임 변경"); // 기본값을 "닉네임 변경"으로 설정
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleMypageCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = () => {
        const token = localStorage.getItem('userToken');

        axios.get('http://localhost:8000/user/mypage/', {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            withCredentials: true
        })
            .then(response => {
                setUserInfo(response.data);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                if (error.response && error.response.status === 401) {
                    // 토큰이 유효하지 않은 경우 로그아웃 처리
                    localStorage.removeItem('userToken');
                    setError('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
                } else {
                    setError('유저 정보를 가져오는데 실패했습니다.');
                }
            });
    };


    const renderCategoryComponent = () => {
        switch (selectedCategory) {
            case "닉네임 변경":
                return <NickNameChange userInfo={userInfo} />;
            case "읽고 있는 책":
                return <ReadingBook userInfo={userInfo} />;
            case "좋아하는 책":
                return <LikeBook userInfo={userInfo} />;
            case "북마크":
                return <BookMark userInfo={userInfo} />;
            case "평점":
                return <AverageScore userInfo={userInfo} />;
            case "댓글":
                return <Comments userInfo={userInfo} />;
            case "주석":
                return <Annotation userInfo={userInfo} />;
            default:
                return <NickNameChange userInfo={userInfo} />;
        }
    }


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


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
