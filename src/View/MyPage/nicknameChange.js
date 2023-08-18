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


    const UpdateURL = 'http://localhost:8000/user/mypage/update/';

    const userToken = localStorage.getItem('userToken'); // localStorage를 사용하는 경우



    useEffect(() => {
        setUsernameData(userInfo.userInfo.nickname);
    }, []);

    const handleSubmit = async () => {
        const data = {
            username: userInfo.userInfo.username,
            email: userInfo.userInfo.email,
            nickname: newNickname
        };

        // 헤더에 토큰을 추가
        const headers = {
            'Authorization': `Bearer ${userToken}` // 여기서 userToken은 userInfo 객체에서 가져옵니다.
        };

        try {
            const response = await axios.put(UpdateURL, data, { headers: headers });
            if (response.status === 200) {
                alert("닉네임이 변경되었습니다.");
                setUsernameData(newNickname);  // 닉네임 상태 업데이트
                setNewNickname('');  // Input 값을 초기화

            }
        } catch (error) {
            alert("닉네임 변경에 실패했습니다.");
        }
    };

    // 한글과 영어의 길이에 따라 위치를 조정하는 함수
    const calculateNimTextPosition = (text) => {
        let byteLength = 0;

        for (let i = 0; i < text.length; i++) {
            if (escape(text.charAt(i)).length > 4) {
                byteLength += 2; // 한글은 2로 계산
            } else {
                byteLength += 1; // 영어는 1로 계산
            }
        }

        return 1100 + (30 * byteLength); // 기존 코드에서 폰트 크기에 따른 조절값을 조정함
    };

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
                style={{ position: "relative", left: calculateNimTextPosition(usernameData), top: 326 }}
            // usernameData의 길이와 30px 폰트 크기를 고려하여 hello 이미지의 위치를 조정합니다.
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