import React, { useState, useEffect } from 'react';

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

    console.log(userInfo.userInfo.nickname);


    useEffect(() => {
        setUsernameData(userInfo.userInfo.nickname);
    }, []);


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
                style={{ position: "absolute", left: 943 + (45 * usernameData.length), top: 326 }}
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
                src={check_nickname}
                alt="check_nickname"
                style={{ position: "absolute", left: 1381, top: 481 }}
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
                style={{
                    position: "absolute",
                    left: 929,
                    top: 493,
                    border: 'none', // 테두리 제거
                    outline: 'none', // 테두리 없애기 위해 추가 (포커스 시 보이는 테두리 제거)
                    fontSize: '22px', // placeholder 글꼴 크기
                    width: '300px', // 너비 조절
                }}
            />
        </div>
    );

}

export default NickNameChange;
