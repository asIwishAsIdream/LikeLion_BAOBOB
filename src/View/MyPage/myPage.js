import React, { useState, useEffect } from "react";
import MypageLeftCategories from "./myPageLeftCategories";
import NickNameChange from "./nicknameChange";
import Annotation from "./annotation";
import AverageScore from "./averageScore";
import Comments from "./comments";
import BookMark from "./bookMark";
import LikeBook from "./likeBook";
import ReadingBook from "./readingBook";
import { useNavigate } from "react-router-dom";  // <-- 수정된 부분
import axios from "axios";

function MyPage() {
    const [selectedCategory, setSelectedCategory] = useState("닉네임 변경");
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();  // <-- 수정된 부분

    // const MainURL = 'http://baobab.kro.kr/';
    const handleMypageCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    useEffect(() => {
        fetchUserInfo();
    }, []);
    const fetchUserInfo = () => {
        const token = localStorage.getItem('userToken');

        axios.get('/user/mypage/', {
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
                    localStorage.removeItem('userToken');
                    alert('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
                    navigate('/');  // <-- 수정된 부분
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
                {renderCategoryComponent()}
            </div>
        </div>
    );
}

export default MyPage;
