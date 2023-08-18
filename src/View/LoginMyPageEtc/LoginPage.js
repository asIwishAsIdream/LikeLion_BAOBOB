import React, { useState } from 'react'; // useState 추가
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// 서버에서 JSON을 받아옵시다!

import loginText from "../../image/login.png";
import loginBtn from "../../image/loginBtn.png";
import emailText from "../../image/emailText.png";
import passwordText from "../../image/passwordText.png";
import RectanglEmail from "../../image/RectangleNick.png";
import Rectanglpassword from "../../image/RectangleNick.png";
import ErrorLogin from "../../image/errorOptionLogin.png";
import LeftCategories from '../leftCategories.js';


function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState(false); // 로그인 에러 상태
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);
    const [isClickedSignUp, setClickedSignUp] = useState(false);
    const navigate = useNavigate();

    // const LoginURL = '/user/login/'; // 이건 정식으로 서버에 올리고 URL을 설정하면 사용할 수 있게된다.
    const LoginURL = '/user/login/';
    // const MainPageURL = 'http://baobab.kro.kr/';


    const handleSubmit = async (event) => {
        event.preventDefault();  // Form의 자동 제출을 방지

        if (!email || !password) {
            alert("이메일과 비밀번호를 모두 입력해주세요.");
            return;
        }

        try {
            const response = await axios.post(LoginURL, {
                'email': email,
                'password': password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const accessToken = response.data.token.access;
            const refreshToken = response.data.token.refresh;
            localStorage.setItem('userToken', accessToken);
            localStorage.setItem('userRefreshToken', refreshToken);
            navigate('/');

        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert("이메일 또는 비밀번호가 잘못되었습니다."); // 로그인 실패 시, 에러 메시지 변경
                } else if (error.response.status === 500) {
                    alert("메일 인증 확인 부탁드립니다");
                } else {
                    alert("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
                }
            } else {
                console.error("기타 오류", error);
            }
        }
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setSelectedBookId(null);  // Reset selected book when changing category
    }


    const resetToInitialState = () => {
        setSelectedBookId(null);
        setSelectedCategory("주간 인기 책");
        setClickedSignUp(false);
    };
    return (
        <div>
            <LeftCategories onCategoryChange={handleCategoryChange} onLogoClick={resetToInitialState} /> {/* onLogoClick prop 전달 */}

            <div style={{
                position: "absolute",
                left: 377,
                top: 76,
            }}>
                <img
                    src={loginText}
                    alt="loginText"
                    style={{ position: "absolute", left: 72.5, top: 126 }}
                />
                <img
                    src={emailText}
                    alt="emailText"
                    style={{ position: "absolute", left: 531.5, top: 303 }}
                />

                <img
                    src={passwordText}
                    alt="passwordText"
                    style={{ position: "absolute", left: 505.5, top: 434 }}
                />

                <img
                    src={RectanglEmail}
                    alt="RectanglEmail"
                    style={{ position: "absolute", left: 647.5, top: 289 }}
                />
                <img
                    src={Rectanglpassword}
                    alt="Rectanglpassword"
                    style={{ position: "absolute", left: 647.5, top: 420 }}
                />


                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="이메일을 입력하세요."
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 670.5,
                            top: 306,
                            border: 'none', // 테두리 제거
                            outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                            fontSize: '22px', // placeholder 글꼴 크기
                            width: '350px', // 너비 조절
                        }}
                    />

                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요,"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 670.5,
                            top: 437,
                            border: 'none', // 테두리 제거
                            outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                            fontSize: '22px', // placeholder 글꼴 크기
                            width: '350px', // 너비 조절
                        }}
                    />
                    <button type="submit" style={{ display: 'none' }}>로그인</button>

                </form>

                {loginError &&
                    (<img
                        src={ErrorLogin}
                        alt="Error during login"
                        style={{ position: "absolute", left: 906 - 304.5, top: 553 }} />)}


                <img
                    src={loginBtn}
                    alt="loginBtn"
                    onClick={() => document.querySelector("button[type='submit']").click()}  // 버튼 태그를 클릭하도록 변경
                    style={{ position: "absolute", left: 723.5, top: 610, cursor: "pointer" }}
                />

            </div>
        </div>
    );

}

export default LoginPage;