import React from "react";
import styled from "styled-components";
import searchIcon from "../../image/searchIcon.png";

// Search Box Component
const SearchBox = styled.input.attrs({
  type: "search",
  placeholder: "Search",
})`
  border: 1px solid gray; // 테두리를 회색으로 변경
  width: 300px;
  height: 45px;
  padding: 0.5em 0.5em 0.5em 45px; // 아이콘 영역을 위해 왼쪽 패딩을 늘림
  border-radius: 5px;
  margin-top: 60px;
  margin-left: 100px;
  background: url(${searchIcon}) no-repeat 10px center; // 아이콘을 배경으로 설정
  background-size: 30px 33.5px; // 아이콘 크기 조정
`;

function SearchBar() {
  return <SearchBox />;
}

export default SearchBar;
