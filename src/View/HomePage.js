// HomePage.js
import React, { useState, useEffect } from "react";
import BasicPageForm from "./CategoryPage/BasicPage";
import LeftCategories from "./leftCategories";
import BookInfo from "./bookInfo";

// 서버에서 JSON을 받아옵시다!
import axios from 'axios';

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("주간 인기 책");
  const [selectedBookId, setSelectedBookId] = useState(null);

  // 데이터 가져오기
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/library/');
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);  // 빈 배열을 인자로 전달, 컴포넌트 마운트 시에만 실행

  // Login 으로 Post 때리기
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginData, setLoginData] = useState(null);
  const url = 'http://127.0.0.1:8000/user/login/';

  const fetchDataPOST = async (event) => {
    event.preventDefault(); // Form의 자동 제출을 방지

    const reqData = {
      'email': email,
      'password': password,
    };

    try {
      const response = await axios.post(url, reqData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLoginData(response.data);
    } catch (e) {
      console.log(e);
    }
  };


  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedBookId(null);  // Reset selected book when changing category
  }

  const handleBookClick = (bookId) => {
    console.log("in");
    setSelectedBookId(bookId);
  }

  return (
    <div style={{ height: "1024px", width: "1920px" }}>
      <LeftCategories onCategoryChange={handleCategoryChange} />

      <div
        style={{
          position: "absolute",
          left: 305,
          width: "100%",
          top: 0,
        }}
      >

        {selectedBookId ? <BookInfo bookId={selectedBookId} /> : <BasicPageForm title={selectedCategory} onBookClick={handleBookClick} />}
        <form onSubmit={fetchDataPOST}>
          {data && <textarea rows={15} value={JSON.stringify(data, null, 2)} readOnly={true} />}
          {loginData && <textarea rows={15} value={JSON.stringify(loginData, null, 2)} readOnly={true} />}
          이메일 : <input type="text" placeholder="이메일을 입력하세요" value={email} onChange={(e) => setEmail(e.target.value)} name="email" /><br /><br />
          PW : <input type="password" placeholder="비밀번호를 입력하세요" value={password} onChange={(e) => setPassword(e.target.value)} name="password" /><br /><br />
          <button type="submit">가져오기!</button>
        </form>
      </div>



    </div>
  );
}

export default HomePage;
