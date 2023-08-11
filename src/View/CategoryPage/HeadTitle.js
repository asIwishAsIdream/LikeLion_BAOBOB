import React from "react";
import styled from "styled-components";

const Title = styled.header`
  position: absolute; // 고정 위치를 위해 absolute를 사용
  left: 72.5px; // 가로 위치
  top: 70px; // 세로 위치
  display: flex;
  width: 200px; // 고정된 너비 설정
  justify-content: space-between;
  align-items: left;
  font-size: 35px;
  font-weight: 700;
  font-family: "SDB";
`;

function HeadTitle({ title }) {
  return <Title>{title}</Title>;
}

export default HeadTitle;
