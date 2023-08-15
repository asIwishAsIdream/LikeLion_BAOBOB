// CategoryTitle.js
import React from 'react';
import styled from 'styled-components';

const Login = styled.a`
    font-family:'Apple SD Gothic Neo M', 'Noto Sans KR','Bagel Fat One',  sans-serif; // 폰트 설정
    color: #808080;
    text-decoration: none; // 밑줄 삭제
    margin-top: 13px;
    font-family: "SDB";
    cursor:'pointer';
    &:hover, &:active, &:visited, &:focus {
        color: gray; // 클릭 시나 호버 시 색상 변경 없음
        
    }
    
`;

function Login_({ onClick }) {
    return <Login onClick={onClick}>로그인</Login>;
}

export default Login_;
