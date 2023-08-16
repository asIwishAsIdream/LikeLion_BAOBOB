// CategoryTitle.js
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)`
    font-family:'Apple SD Gothic Neo M', 'Noto Sans KR','Bagel Fat One',  sans-serif;
    color: #808080;
    text-decoration: none;
    margin-top: 13px;
    font-family: "SDB";
    cursor: pointer;
    &:hover, &:active, &:visited, &:focus {
        color: gray;
    }
`;

function Login_() {
    return <StyledLink to='/loginpage/'>로그인</StyledLink>;
}

export default Login_;
