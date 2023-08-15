// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./View/HomePage";
import BookInfo from './View/bookInfo.js';  // bookinfo.js의 경로를 지정하세요
import ReadPage from './View/ReadPage/ReadPage.js';
import MyPage from './View/MyPage/myPage';
import LoginPage from './View/LoginMyPageEtc/LoginPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book/:bookId" element={<BookInfo />} />
          <Route path="/read/:bookId" element={<ReadPage />} />
          <Route path="/user/mypage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
