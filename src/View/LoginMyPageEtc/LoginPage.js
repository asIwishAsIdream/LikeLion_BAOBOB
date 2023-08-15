import loginText from "../../image/login.png";
import loginBtn from "../../image/loginBtn.png";
import emailText from "../../image/emailText.png";
import passwordText from "../../image/passwordText.png";
import RectanglEmail from "../../image/RectangleNick.png";
import Rectanglpassword from "../../image/RectangleNick.png";


function LoginPage() {

    return (
        <div>
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
                src={loginBtn}
                alt="loginBtn"
                style={{ position: "absolute", left: 723.5, top: 610 }}
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

            <input
                type="text"
                placeholder="이메일을 입력하세요."
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
                type="text"
                placeholder="비밀번호를 입력하세요,"
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


        </div>
    );

}

export default LoginPage;