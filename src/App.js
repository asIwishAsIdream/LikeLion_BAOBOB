// App.js
import React, { useState } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./View/HomePage";
import BookInfo from "./View/bookInfo.js"; // bookinfo.js의 경로를 지정하세요
import ReadPage from "./View/ReadPage/ReadPage.js";
import MyPage from "./View/MyPage/myPage";
import LoginPage from "./View/LoginMyPageEtc/LoginPage";
import SignUpPage from "./View/LoginMyPageEtc/SignUp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isLoggedIn={isLoggedIn}
                setLoginStatus={setIsLoggedIn}
              />
            }
          />
          <Route path="/bookinfo/:bookId" element={<BookInfo />} />
          <Route path="/read/:bookid" element={<ReadPage />} />
          <Route path="/user/mypage" element={<MyPage />} />
          <Route path="/loginpage/" element={<LoginPage />} />
          <Route path="/signupage/" element={<SignUpPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
