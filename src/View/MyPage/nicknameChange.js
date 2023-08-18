import React, { useState, useEffect } from 'react';
import axios from "axios";

import nickname from "../../image/nickname_change.png";
import nicknamechange from "../../image/nicknameText.png";
import check_nickname from "../../image/check_nickname.png";
import RectangleNick from "../../image/RectangleNick.png";
import inputing from "../../image/inputing.png";
import Line7 from "../../image/Line 7.png";
import hello from "../../image/helloText.png";
import nimText from "../../image/nimText.png";


function NickNameChange(userInfo) {
    const [usernameData, setUsernameData] = useState(''); // 닉네임 데이터를 저장할 state
    const [newNickname, setNewNickname] = useState(''); // 변경할 닉네임을 저장할 state


    const UpdateURL = '/user/mypage/update/';




    useEffect(() => {
        setUsernameData(userInfo.userInfo.nickname);
    }, []);

    const handleSubmit = async () => {
        const data = {
            nickname: newNickname
        };

        // 인증 토큰 가져오기 (예: localStorage에서 가져오는 경우)
        const token = localStorage.getItem('userToken');

        const config = {
            headers: {
                'Authorization': `Bearer ${token}`  // JWT 토큰 사용 예시
            }
        };

        try {
            const response = await axios.put(UpdateURL, data, config);
            if (response.status === 200) {
                alert("닉네임이 변경되었습니다.");
                setUsernameData(newNickname);  // 닉네임 상태 업데이트

            }
        } catch (error) {
            console.error("Error:", error.response);  // 오류 응답 출력
            alert("닉네임 변경에 실패했습니다.");
        }
        setNewNickname('');  // input 내용 초기화

    };

    const isEnglish = /^[A-Za-z0-9]*$/.test(usernameData);
    const offset = isEnglish ? (23 * String(usernameData).length) : (45 * String(usernameData).length);

    return (
        <div>
            <img
                src={hello}
                alt="hello"
                style={{ position: "absolute", left: 943, top: 326 }}
            />

            <span
                style={{
                    position: "absolute",
                    left: 1120,  // hello 이미지 오른쪽으로 5px 떨어뜨립니다.
                    top: 305,
                    color: "#3477CF",
                    fontSize: "45px",
                    fontWeight: 700,
                }}>
                {usernameData}
            </span>
            <img
                src={nimText}
                alt="nimText"
                style={{
                    position: "relative",
                    left: 1153 + offset,
                    top: 326
                }}
            />


            <img
                src={nickname}
                alt="nickname"
                style={{ position: "absolute", left: 377, top: 70 }}
            />
            <img
                src={nicknamechange}
                alt="nicknamechange"
                style={{ position: "absolute", left: 729, top: 490 }}
            />

            <img
                src={RectangleNick}
                alt="RectangleNick"
                style={{ position: "absolute", left: 906, top: 476 }}
            />
            <img
                src={RectangleNick}
                alt="RectangleNick"
                style={{ position: "absolute", left: 906, top: 601 }}
            />
            <img
                src={inputing}
                alt="inputing"
                style={{ position: "absolute", left: 929, top: 618 }}
            />
            <img
                src={Line7}
                alt="Line7"
                style={{ position: "absolute", left: 1087, top: 618 }}
            />



            <input
                type="text"
                placeholder="변경할 닉네임을 입력하세요."
                value={newNickname}  // value를 상태로 설정
                onChange={(e) => setNewNickname(e.target.value)}  // 입력 값이 변경될 때마다 상태 업데이트
                style={{
                    position: "absolute",
                    left: 929,
                    top: 493,
                    border: 'none',
                    outline: 'none',
                    fontSize: '22px',
                    width: '300px',
                }}
            />
            <img
                src={check_nickname}
                onClick={handleSubmit}
                alt="check_nickname"
                style={{ position: "absolute", left: 1381, top: 481, cursor: 'pointer' }}
            />
        </div>
    );

}

export default NickNameChange;
