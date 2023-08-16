import React, { useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import "./Fonts.css";
import BackArrow from "../image/back_arraw.png";
import Published_2023 from "../image/published_2023.png";
import Donated from "../image/donated.png";
import BookCoverExample from "../image/book_example.png";
import EmptyButton from "../image/empty_button.png";
import ReadButton from "../image/read_button.png";
import HeartClicked from "../image/heart_clicked.png";
import HeartUnclicked from "../image/heart_unclicked.png";
import Raising from "../image/raising.png";
import LeftCategories from "./leftCategories";

import "./ScrollBar.css";

function BookInfo() {
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");
  const [selectedBookId, setSelectedBookId] = useState(null);
  const [isClickedSignUp, setClickedSignUp] = useState(false);


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBookId(null);  // Reset selected book when changing category
  }


  const resetToInitialState = () => {
    setSelectedBookId(null);
    setSelectedCategory("주간 인기 책");
    setClickedSignUp(false);
  };


  const { bookId } = useParams();
  const navigate = useNavigate();  // useNavigate hook 사용

  // 뒤로 가기 함수 정의
  const handleGoBack = () => {
    navigate(-1);  // 이전 페이지로 이동
  };

  const handleReadClick = () => {
    navigate(`/read/${bookId}`);
  };

  return (
    <div style={{ height: "1024px", width: "1615px" }}>
      <LeftCategories onCategoryChange={handleCategoryChange} onLogoClick={resetToInitialState} /> {/* onLogoClick prop 전달 */}

      <div style={{
        position: "absolute",
        left: 377,
        top: 76,
      }}>

        <img
          src={BackArrow}
          alt="BackArrow"
          style={{ position: "absolute", left: 377 - 305, top: 78, cursor: 'pointer' }}
          onClick={handleGoBack}

        />
        <div
          style={{
            position: "absolute",
            left: 414 - 305,
            top: 186,
            width: 1000,
            maxWidth: "794px",
            fontFamily: "SDB",
            fontSize: "40px",
          }}
        >
          죽음 : 이토록 가깝고 이토록 먼
        </div>
        <div
          style={{
            position: "absolute",
            left: 414 - 305,
            top: 249,
            width: 1000,
            maxWidth: "794px",
            fontFamily: "SDSB",
            fontSize: "30px",
            color: "#545454",
          }}
        >
          블라디미르 장켈레비치
        </div>

        <div
          className="custom-scrollbar"
          style={{
            overflow: "auto",
            position: "absolute",
            left: 414 - 305,
            top: 410,
            width: "792px",
            maxHeight: "563px",
            fontFamily: "SDSB",
            fontSize: "20px",
            color: "#8F8F8F",
            lineHeight: "160%",
            textAlign: "left",
          }}
        >
          1 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세.
          무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          <br />
          <br />2 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리
          기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          <br />
          <br />3 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴
          일편단심일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          <br />
          <br />4 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라
          사랑하세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          <br />
          <br />1 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. <br />
          <br />2 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리
          기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          <br />
          <br />3 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴
          일편단심일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          <br />
          <br />4 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라
          사랑하세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.1
          동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화
          삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 2 남산 위에 저
          소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리
          화려 강산 대한 사람, 대한으로 길이 보전하세. 3 가을 하늘 공활한데 높고
          구름 없이 밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산 대한
          사람, 대한으로 길이 보전하세. 4 이 기상과 이 맘으로 충성을 다하여
          괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람,
          대한으로 길이 보전하세.1 동해 물과 백두산이 마르고 닳도록 하느님이
          보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이
          보전하세. 2 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리
          기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 3
          가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세.
          무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 4 이 기상과
          이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리
          화려 강산 대한 사람, 대한으로 길이 보전하세.1 동해 물과 백두산이 마르고
          닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한
          사람, 대한으로 길이 보전하세. 2 남산 위에 저 소나무, 철갑을 두른 듯 바람
          서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로
          길이 보전하세. 3 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴
          일편단심일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          4 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세.
          무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.1 동해 물과
          백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리
          화려 강산 대한 사람, 대한으로 길이 보전하세. 2 남산 위에 저 소나무,
          철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산
          대한 사람, 대한으로 길이 보전하세. 3 가을 하늘 공활한데 높고 구름 없이
          밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산 대한 사람,
          대한으로 길이 보전하세. 4 이 기상과 이 맘으로 충성을 다하여 괴로우나
          즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이
          보전하세.1 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 2 남산
          위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화
          삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 3 가을 하늘 공활한데
          높고 구름 없이 밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산
          대한 사람, 대한으로 길이 보전하세. 4 이 기상과 이 맘으로 충성을 다하여
          괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람,
          대한으로 길이 보전하세.1 동해 물과 백두산이 마르고 닳도록 하느님이
          보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이
          보전하세. 2 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리
          기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 3
          가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세.
          무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 4 이 기상과
          이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리
          화려 강산 대한 사람, 대한으로 길이 보전하세.1 동해 물과 백두산이 마르고
          닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한
          사람, 대한으로 길이 보전하세. 2 남산 위에 저 소나무, 철갑을 두른 듯 바람
          서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로
          길이 보전하세. 3 가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴
          일편단심일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.
          4 이 기상과 이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세.
          무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세.1 동해 물과
          백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세. 무궁화 삼천리
          화려 강산 대한 사람, 대한으로 길이 보전하세. 2 남산 위에 저 소나무,
          철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화 삼천리 화려 강산
          대한 사람, 대한으로 길이 보전하세. 3 가을 하늘 공활한데 높고 구름 없이
          밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산 대한 사람,
          대한으로 길이 보전하세. 4 이 기상과 이 맘으로 충성을 다하여 괴로우나
          즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이
          보전하세.1 동해 물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라
          만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 2 남산
          위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리 기상일세. 무궁화
          삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 3 가을 하늘 공활한데
          높고 구름 없이 밝은 달은 우리 가슴 일편단심일세. 무궁화 삼천리 화려 강산
          대한 사람, 대한으로 길이 보전하세. 4 이 기상과 이 맘으로 충성을 다하여
          괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리 화려 강산 대한 사람,
          대한으로 길이 보전하세.1 동해 물과 백두산이 마르고 닳도록 하느님이
          보우하사 우리나라 만세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이
          보전하세. 2 남산 위에 저 소나무, 철갑을 두른 듯 바람 서리 불변함은 우리
          기상일세. 무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 3
          가을 하늘 공활한데 높고 구름 없이 밝은 달은 우리 가슴 일편단심일세.
          무궁화 삼천리 화려 강산 대한 사람, 대한으로 길이 보전하세. 4 이 기상과
          이 맘으로 충성을 다하여 괴로우나 즐거우나 나라 사랑하세. 무궁화 삼천리
          화려 강산 대한 사람, 대한으로 길이 보전하세.
        </div>

        <img
          src={Published_2023}
          alt="Published_2023"
          style={{ position: "absolute", left: 414 - 305, top: 309 }}
        />
        <img
          src={Donated}
          alt="Donated"
          style={{ position: "absolute", left: 509 - 305, top: 309 }}
        />

        <img
          src={BookCoverExample}
          alt="BookCover"
          style={{ position: "absolute", left: 1356 - 305, top: 186 }}
        />

        <img
          src={Raising}
          alt="Raising"
          style={{ position: "absolute", left: 1399 - 305, top: 840 }}
        />
        <div
          style={{
            position: "absolute",
            top: 881,
            left: 1414 - 305,
            fontFamily: "SDEB",
            color: "#3477CF",
            fontSize: "25px",
          }}
        >
          4.3
        </div>

        <img
          src={HeartUnclicked}
          alt="heart_unclicked"
          style={{ position: "absolute", left: 1550 - 305, top: 852 }}
        />
        <img
          src={EmptyButton}
          alt="EmptyButton"
          style={{ position: "absolute", left: 1514 - 305, top: 840 }}
        />
        <div
          style={{
            position: "absolute",
            top: 881,
            left: 1537 - 305,
            fontFamily: "SDEB",
            color: "#8F8F8F",
            fontSize: "25px",
          }}
        >
          3333
        </div>
        <img
          src={ReadButton}
          alt="ReadButton"
          style={{ position: "absolute", left: 1629 - 305, top: 840, cursor: "pointer" }}
          onClick={handleReadClick}

        />
      </div>
    </div>
  );
}

export default BookInfo;
