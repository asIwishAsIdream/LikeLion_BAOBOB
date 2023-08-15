import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import HeadTitle from "./HeadTitle";
import SearchBar from "./SearchBar";
import MyPageTag from "./MyPage";
import Login_ from "./Login";
import SmallCategoryBar from "./SmallCategoryBar";
import SortComponent from "./SortByOptionsinCategoryPage/SortingComponent";
import right_arrow from "../../image/right_arrow_small_category.png";
import left_arrow from "../../image/left_arrow_small_category.png";
import BookList from "./BookList";
import LoginPage from "../LoginMyPageEtc/LoginPage";

import "../../View/Fonts.css";


const Container = styled.div`
  font-family: "SDB";
  display: flex;
  align-items: center;
`;

const Divider = styled.span`

  margin: 0 5px;
  margin-top: 13px;
  color: #808080;
`;

const RightSection = styled.div`
  font-family: "SDB";
  position: absolute;
  left: 960.5px;
  top: 70px;
  display: flex;
  gap: 15px;
`;

const ScrollContainer = styled.div`
  font-family: "SDB";
  display: flex;
  position: absolute;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  left: 66.5px; // 가로 위치
  top: 148px; // 세로 위치
  width: 1391px;
`;

const ScrollButton = styled.button`
  display: ${(props) => (props.show ? "block" : "none")};
  position: absolute;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover; // 화살표 이미지의 크기에 맞게 조정
  ${(props) => {
    if (props.direction === "left") {
      return `
                background-image: url(${left_arrow});
                position: absolute;
                width: 25px; // 따옴표 제거
                height: 25px; // 따옴표 제거
                left:47.5px;
                top:147px;
            `;
    } else {
      return `
                background-image: url(${right_arrow});
                position: absolute;
                width: 25px; // 따옴표 제거
                height: 24px; // 따옴표 제거
                left:1469.5px;
                top:148px;
            `;
    }
  }}
`;

function BasicPageForm({ bookId, title, onBookClick, isLoggedIn, setLoginStatus }) {
  // POST 요청 필요


  const categories = ["전체", "사회", "교육", "공학", "자연", "의약", "예체능", "융복합"];
  const small_category_title = Array(5).fill(categories).flat();

  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  // 가로 title 선택 제어
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
  // 로그인 임시 여부
  const [isLoggedInTmp, setIsLoggedInTmp] = useState(false);

  // 로그인 버튼 클릭 이벤트 핸들러
  const handleLoginClick = () => {
    setLoginStatus(true);  // 여기서 HomePage.js의 로그인 상태를 변경
  }

  const selectCategory = (index) => {
    setSelectedCategoryIndex(index);
  };


  const handleScroll = (scrollOffset) => {
    scrollContainerRef.current.scrollLeft += scrollOffset;
    setShowLeftArrow(scrollContainerRef.current.scrollLeft > 0);
    setShowRightArrow(
      scrollContainerRef.current.scrollLeft <
      scrollContainerRef.current.scrollWidth -
      scrollContainerRef.current.clientWidth
    );
  };

  useEffect(() => {
    setShowLeftArrow(false);
    setShowRightArrow(
      scrollContainerRef.current.scrollWidth >
      scrollContainerRef.current.clientWidth
    );
  }, []);

  if (isLoggedIn) {

    return <LoginPage />;
  }

  else {

    return (

      <div>
        <Container>
          <div>
            <HeadTitle title={title} />
          </div>
          <RightSection>
            <SearchBar />
            <Login_ onClick={handleLoginClick} />
            <Divider>|</Divider>
            <MyPageTag />
          </RightSection>
        </Container>
        <ScrollButton
          show={showLeftArrow}
          direction="left"
          onClick={() => handleScroll(-100)}
        />
        <ScrollContainer ref={scrollContainerRef}>
          {small_category_title.map((category, index) => (
            <SmallCategoryBar
              key={index}
              selected={index === selectedCategoryIndex}
              onClick={() => selectCategory(index)}
            >
              {category}
            </SmallCategoryBar>
          ))}
        </ScrollContainer>
        <ScrollButton
          show={showRightArrow}
          direction="right"
          onClick={() => handleScroll(100)}
        />
        <div>
          <SortComponent />
        </div>
        <BookList onBookClick={onBookClick} ></BookList>
      </div>
    );
  }
}

export default BasicPageForm;
