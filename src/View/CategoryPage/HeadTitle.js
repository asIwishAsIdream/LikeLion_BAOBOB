import React from "react";
import styled from "styled-components";

const Title = styled.header`
  display: flex;
  width: 200px; // 고정된 너비 설정
  justify-content: space-between;
  align-items: left;
  padding: 1em;
  margin-left: 72.5px;
  margin-top: 60px;
  font-size: 35px;
  font-weight: 700;
  font-family: "Apple SD Gothic Neo M", "Noto Sans KR", "Bagel Fat One",
    sans-serif; // 폰트 설정
`;

function HeadTitle({ title }) {
  return <Title>{title}</Title>;
}

export default HeadTitle;
