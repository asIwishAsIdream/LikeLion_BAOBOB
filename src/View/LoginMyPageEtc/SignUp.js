import React, { useState } from 'react';
import axios from 'axios';  // axios를 사용하기 위해 import합니다.
import { useNavigate } from 'react-router-dom';

import LeftCategories from '../leftCategories';
import signupText from "../../image/signupText.png";
import signUpBtn from "../../image/signupBtn.png";
import signup_component from "../../image/signup_component.png";
import successedSignUp from "../../image/successedSignUp.png";
import passwordIsNotSame from "../../image/passwordIsNotSame.png";
import './SignUp.css';

function SignUpPage({ isLoggedIn, setLoginStatus, setClickedSignUp, setIsLoginClicked }) {
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPasswordError, setShowPasswordError] = useState(false);  // 비밀번호 불일치 시 이미지를 보여주기 위한 상태
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedBookId, setSelectedBookId] = useState(null);

    const navigate = useNavigate();

    const signUpURL = 'http://127.0.0.1:8000/user/register/';

    const handleSubmit = async (event) => {
        event.preventDefault();  // Form의 자동 제출을 방지

        if (password !== confirmPassword) {
            console.log(typeof (password));
            setShowPasswordError(true);  // 비밀번호 불일치 상태 설정
            return;
        } else {
            setShowPasswordError(false);  // 일치할 경우 에러 메시지 숨기기
        }

        try {
            await axios.post(signUpURL, {
                'nickname': "nicktest1",
                'username': nickname,
                'email': email,
                'password1': password,
                'password2': confirmPassword
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );

            alert("회원가입에 성공하였습니다.");
            navigate('/');  // 먼저 이동
            setIsLoginClicked(true);

        } catch (error) {
            if (error.response && error.response.status === 400) {
                console.error("회원가입 오류", error);
                alert("회원가입에 실패하였습니다.");
            } else {
                console.error("기타 오류", error);
            }
        }
    }

    const handleCategoryChange = (category) => {
        setSelectedCategory(null);
    }


    const resetToInitialState = () => {
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
                    src={signupText}
                    alt="signupText"
                    style={{ position: "absolute", left: 72.5, top: 126 }}
                />

                <img
                    src={signup_component}
                    alt="signup_component"
                    style={{ position: "absolute", left: 750 - 304.5, top: 243 }}
                />


                {/* <img
                    src={successedSignUp}
                    alt="successedSignUp"
                    style={{ position: "absolute", left: 895 - 304.5, top: 854 }}
                /> */}



                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="닉네임을 입력하세요"
                        className="input-placeholder-color"
                        value={nickname}
                        onChange={e => setNickname(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 975 - 304.5,
                            top: 260,
                            border: 'none', // 테두리 제거
                            outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                            fontSize: '22px', // placeholder 글꼴 크기
                            width: '350px', // 너비 조절


                        }}
                    />
                    <input
                        type="text"
                        placeholder="이메일을 입력하세요"
                        className="input-placeholder-color"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 975 - 304.5,
                            top: 391,
                            border: 'none', // 테두리 제거
                            outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                            fontSize: '22px', // placeholder 글꼴 크기
                            width: '350px', // 너비 조절


                        }}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 입력하세요"
                        className="input-placeholder-color"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 975 - 304.5,
                            top: 522,
                            border: 'none', // 테두리 제거
                            outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                            fontSize: '22px', // placeholder 글꼴 크기
                            width: '350px', // 너비 조절


                        }}
                    />
                    <input
                        type="password"
                        placeholder="비밀번호를 한 번 더 입력하세요"
                        className="input-placeholder-color"
                        value={confirmPassword}

                        onChange={e => setConfirmPassword(e.target.value)}
                        style={{
                            position: "absolute",
                            left: 975 - 304.5,
                            top: 653,
                            border: 'none', // 테두리 제거
                            outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                            fontSize: '22px', // placeholder 글꼴 크기
                            width: '350px', // 너비 조절


                        }}
                    />

                    <button type="submit" style={{ display: 'none' }}>회원가입</button>
                </form>

                {showPasswordError && (
                    <img
                        src={passwordIsNotSame}
                        alt="Password is not same"
                        style={{ position: "absolute", left: 967 - 304.5, top: 706 }}

                    />
                )}

                <img
                    src={signUpBtn}
                    alt="signUpBtn"
                    onClick={() => document.querySelector("button[type='submit']").click()}  // 버튼 태그를 클릭하도록 변경
                    style={{ position: "absolute", left: 1016 - 304.5, top: 770 }}
                />
            </div>

        </div>
    );
}

export default SignUpPage;