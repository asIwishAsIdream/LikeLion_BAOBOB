import nickname from "../../image/nickname.png";
import nicknamechange from "../../image/nicknamechange.png";
import check_nickname from "../../image/check_nickname.png";
import RectangleNick from "../../image/RectangleNick.png";
import inputing from "../../image/inputing.png";
import Line7 from "../../image/Line 7.png";

function NickNameChange() {

    return (
        <div>
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
