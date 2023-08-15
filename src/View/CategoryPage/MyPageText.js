import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'; // Link 컴포넌트를 import

// Search Box Component
const MyPage2 = styled(Link)`
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

function MyPageTag() {
    return <MyPage2 to='/user/mypage' >마이페이지</MyPage2>; // href 대신 to prop를 사용
}

export default MyPageTag;
