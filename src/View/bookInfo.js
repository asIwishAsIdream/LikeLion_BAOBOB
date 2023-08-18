import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Fonts.css";
import BackArrow from "../image/back_arraw.png";
import Published from "../image/Rectangle 20.png";
import Donated from "../image/donatedstatus.png";
//import BookCoverExample from "../image/book_example.png";
import EmptyButton from "../image/empty_button.png";
import ReadButton from "../image/read_button.png";
import HeartClicked from "../image/heart_clicked.png";
import HeartUnclicked from "../image/heart_unclicked.png";
import Raising from "../image/raising.png";
import LeftCategories from "./leftCategories";
import axios from "axios";
import "./ScrollBar.css";

var book = {
  book_id: 123,

  book_cover: "/image/book_example.png",
  mainCategory_id: 1,
  subCategory_id: 2,
  book_name: "김남혁 자서전",
  author: "천하제일김남혁",
  is_popular: true,
  publication_year: 2023,
  views: 77,
  like: 88,
  average_rating: 5.5,
  book_introduction: "text\n\ntext kiki\n",
  book_status: "text",
  created_at: "2021-05-01",
};

function BookInfo() {
  const [book, setBook] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");
  const [isClickedSignUp, setClickedSignUp] = useState(false);
  const [selectedBookId, setSelectedBookId] = useState(null);

  const [selectedIcon, setSelectedIcon] = useState(null);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBookId(null); // Reset selected book when changing category
  };

  const resetToInitialState = () => {
    setSelectedBookId(null);
    setSelectedCategory("주간 인기 책");
    setClickedSignUp(false);
  };

  const { bookid } = useParams();
  console.log("bookID : " + bookid);
  const navigate = useNavigate();

  useEffect(() => {
    var serverUrl = `/library/detail/${bookid}/`;

    axios
      .get(serverUrl)
      .then((response) => {
        setBook(response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the request:", error);
      });
  }, [bookid]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleReadClick = () => {
    navigate(`/read/${bookid}`);
  };

  return (
    <div style={{ height: "1024px", width: "1615px" }}>
      <LeftCategories
        onCategoryChange={handleCategoryChange}
        onLogoClick={resetToInitialState}
      />{" "}
      {/* onLogoClick prop 전달 */}
      <div
        style={{
          position: "absolute",
          left: 377,
          top: 76,
        }}
      >
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
          {book.book_name}
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
          {book.author}
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
          {book.book_introduction}
        </div>
        <img
          src={Published}
          alt="Published"
          style={{ position: "absolute", left: 414 - 305, top: 309 }}
        />
        <div
          class="center-aligned"
          style={{
            position: "absolute",
            left: 414 - 305,
            top: 314,
            width: 80,
            height: 40,
            fontFamily: "SDB",
            color: "#3477CF",
            fontSize: "25px",
          }}
        >
          {book.publication_year}
        </div>
        <img
          src={Donated}
          alt="Donated"
          style={{ position: "absolute", left: 509 - 305, top: 309 }}
        />
        <div
          class="center-aligned"
          style={{
            position: "absolute",
            left: 509 - 305,
            top: 314,
            width: 80,
            height: 40,
            fontFamily: "SDB",
            color: "#244F8D",
            fontSize: "25px",
          }}
        >
          {book.book_status}
        </div>
        <img
<<<<<<< HEAD
          src={process.env.PUBLIC_URL + `/책표지/${book.book_name}.jpeg`}
=======
          src={
            process.env.PUBLIC_URL +
            `/media/${book.title}/cover/${book.title}_cover.jpeg`
          }
>>>>>>> e7f83049af7a52b4551e4fadf9c342ee996f8238
          alt={`Cover of ${book.book_name}`}
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
            fontSize: "26px",
          }}
        >
          {book.average_rating}
        </div>
        <img
          src={selectedIcon === "heartclicked" ? HeartClicked : HeartUnclicked}
          alt="heart_unclicked"
          style={{ position: "absolute", left: 1550 - 305, top: 852 }}
        />
        <div
          class="center-aligned"
          style={{
            position: "absolute",
            top: 881,
            left: 1514 - 305,
            fontFamily: "SDEB",
            color: "#8F8F8F",
            fontSize: "25px",
            width: 100,
            height: 30,
          }}
        >
          {book.like}
        </div>
        <img
          src={EmptyButton}
          alt="EmptyButton"
          style={{ position: "absolute", left: 1514 - 305, top: 840 }}
          onClick={() => {
            setSelectedIcon(
              selectedIcon === "heartclicked" ? null : "heartclicked"
            );
          }}
        />
        <img
          src={ReadButton}
          alt="ReadButton"
          style={{
            position: "absolute",
            left: 1629 - 305,
            top: 840,
            cursor: "pointer",
          }}
          onClick={handleReadClick}
        />
        <img
          src={BackArrow}
          alt="BackArrow"
          style={{
            position: "absolute",
            left: 377 - 305,
            top: 78,
            cursor: "pointer",
          }}
          onClick={handleGoBack}
        />
      </div>
    </div>
  );
}

export default BookInfo;
