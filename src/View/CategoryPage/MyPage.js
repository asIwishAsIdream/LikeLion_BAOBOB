import React from 'react';
import styled from 'styled-components';

// Search Box Component
const MyPage = styled.a`
    margin-top: 13px;
    margin-left: 13px;
    font-family:'Apple SD Gothic Neo M', 'Noto Sans KR','Bagel Fat One',  sans-serif; // 폰트 설정
    color: #808080;
    text-decoration: none; // 밑줄 삭제


    
    &:hover, &:active, &:visited, &:focus {
        color: gray; // 클릭 시나 호버 시 색상 변경 없음
        
    }
`;


function MyPageTag() {
    return <MyPage href='#' >마이페이지</MyPage>;
}

export default MyPageTag;