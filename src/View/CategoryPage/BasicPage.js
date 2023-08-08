import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import HeadTitle from "./HeadTitle";
import SearchBar from "./SearchBar";
import MyPageTag from "./MyPage";
import LoginAndLogout from "./LoginLogout";
import SmallCategoryBar from "./SmallCategoryBar";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import SortComponent from "./SortByOptionsinCategoryPage/SortingComponent";
import right_arrow from "../../image/right_arrow_small_category.png";
import left_arrow from "../../image/left_arrow_small_category.png";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.span`
  margin: 0 5px;
  margin-top: 70px;
  color: #808080f;
`;

const RightSection = styled.div`
  margin-left: 540px;
  display: flex;
  gap: 15px;
`;

const ScrollContainer = styled.div`
  display: flex;
  position: absolute;
  overflow-x: auto;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-left: 114.5px;
  top: 173px;
  width: 1345px;
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
                width: 25px; // 따옴표 제거
                height: 25px; // 따옴표 제거
                left:402px;
                top:173px;
            `;
    } else {
      return `
                background-image: url(${right_arrow});
                width: 25px; // 따옴표 제거
                height: 24px; // 따옴표 제거
                left:1752px;
                top:173px;
            `;
    }
  }}
`;

function BasicPageForm({ title }) {
  const small_category_title = [
    "전체",
    "사회",
    "교육",
    "공학",
    "자연",
    "의약",
    "예체능",
    "융복합",
    "사회",
    "교육",
    "공학",
    "자연",
    "의약",
    "예체능",
    "융복합",
    "사회",
    "교육",
    "공학",
    "자연",
    "의약",
    "예체능",
    "융복합",
    "사회",
    "교육",
    "공학",
    "자연",
    "의약",
    "예체능",
    "융복합",
    "사회",
    "교육",
    "공학",
    "자연",
    "의약",
    "예체능",
    "융복합",
  ];
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  // 가로 title 선택 제어
  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);

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

  return (
    <div>
      <Container>
        <div>
          <HeadTitle title={title} />
        </div>
        <RightSection>
          <SearchBar />
          <MyPageTag />
          <Divider>|</Divider>
          <LoginAndLogout />
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
    </div>
  );
}

export default BasicPageForm;
