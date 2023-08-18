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
import { useNavigate } from 'react-router-dom';


function MyPage() {
    const [selectedCategory, setSelectedCategory] = useState("닉네임 변경"); // 기본값을 "닉네임 변경"으로 설정
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    // const MainURL = 'http://baobab.kro.kr/';
    const handleMypageCategoryChange = (category) => {
        setSelectedCategory(category);
    }

    const RefreshURL = "/user/auth/refresh/";

    useEffect(() => {
        fetchUserInfo();
    }, []);

    const fetchUserInfo = async () => {
        const token = localStorage.getItem('userToken');
        const refreshToken = localStorage.getItem('userRefreshToken');

        try {
            const response = await axios.get('/user/mypage/', {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                withCredentials: true
            });

            setUserInfo(response.data);
            setLoading(false);

        } catch (error) {
            setLoading(false);

            if (error.response && error.response.status === 401) {
                // 토큰이 유효하지 않은 경우 refresh token으로 로그인 할 수 있게함
                try {
                    const response = await axios.post(RefreshURL, {
                        refresh: refreshToken
                    }, {
                        withCredentials: true
                    });
                    const accessToken = response.data.access;
                    console.log("accessToken : " + accessToken);
                    localStorage.setItem('userToken', accessToken);

                    const refreshTokenNew = response.data.refresh;
                    localStorage.setItem('userRefreshToken', refreshTokenNew);
                    alert("in");
                    // 성공적으로 토큰을 갱신했으므로, 사용자 정보를 다시 요청
                    fetchUserInfo();

                } catch (error) {
                    localStorage.removeItem('userToken');
                    alert("다시 로그인해주세요.");
                    navigate('/');
                    setError('토큰이 유효하지 않습니다. 다시 로그인해주세요.');
                }
            } else {
                setError('유저 정보를 가져오는데 실패했습니다.');
            }
        }
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
