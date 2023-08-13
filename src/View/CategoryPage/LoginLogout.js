// CategoryTitle.js
import React from 'react';
import styled from 'styled-components';

const Login_Logout = styled.a`
    font-family:'Apple SD Gothic Neo M', 'Noto Sans KR','Bagel Fat One',  sans-serif; // 폰트 설정
    color: #808080;
    text-decoration: none; // 밑줄 삭제
    margin-top: 13px;
    font-family: "SDB";
    &:hover, &:active, &:visited, &:focus {
        color: gray; // 클릭 시나 호버 시 색상 변경 없음
        
    }
`;

function LoginAndLogout({ }) {
    return <Login_Logout href="#">로그인</Login_Logout>;
}

export default LoginAndLogout;
