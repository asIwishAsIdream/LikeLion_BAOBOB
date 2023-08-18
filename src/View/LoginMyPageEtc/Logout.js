import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


// Search Box Component
const Logout_ = styled(Link)`
    margin-top: 13px;
    margin-left: 13px;
    font-family:'Apple SD Gothic Neo M', 'Noto Sans KR','Bagel Fat One',  sans-serif;
    color: #808080;
    text-decoration: none;
    font-family: "SDB";

    &:hover, &:active, &:visited, &:focus {
        color: gray;
    }
`;


function Logout() {

    const handleLogout = () => {
        axios.delete('http://localhost:8000/user/logout/', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('userToken')}`
            },
            withCredentials: true
        })
            .then(response => {
                localStorage.removeItem('userToken'); // 로컬 스토리지의 토큰 삭제
                alert('로그아웃 되었습니다.');
                window.location.reload();
                // 로그아웃 후 새로고침
            })
            .catch(error => {
                console.error("로그아웃 실패:", error);
                localStorage.removeItem('userToken');
                alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
            });
    }

    return <Logout_ onClick={handleLogout}>로그아웃</Logout_>;
}

export default Logout;