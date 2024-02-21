import React from "react";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { setCookie } from "../../cookie";
import { SV_HOST, SV_LOCAL, FRONT_URL } from "../../constants";
import { setIsMentor } from "../../store/isMentorSlice";
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../store/isLoginSlice";
import styled from "styled-components";

function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${SV_LOCAL}/api/authenticate`, {
        username: id,
        password: password,
      })
      .then((res) => {
        if (res.data.token) {
          window.alert("success");
          const jwtToken = res.data.token;
          console.log(res.data);
          const parts = jwtToken.split(".");
          const payload = JSON.parse(atob(parts[1]));
          dispatch(setIsLogin(true));
          dispatch(setIsMentor(payload.isTutor));
          // setCookie("isTutor", isTutor, {
          //   path: "/",
          //   secure: true,
          //   sameSite: "none",
          // });
          setCookie("jwtToken", jwtToken, {
            path: "/",
            secure: true,
            sameSite: "none",
            // httpOnly: true,
          });

          if (payload.isTutor) navigate("/mentor");
          else navigate("/mentee");
        } else window.alert("로그인 정보가 없습니다.");
      })
      .catch((err) => {
        console.error(err);
        window.alert("error");
      });
  };
  return (
    <LoginLayout>
      <FormWrapper>
        <span className="title">로그인</span>
        <Form action="" onSubmit={onSubmit}>
          <input
            className="input"
            type="text"
            placeholder="아이디를 입력하세요."
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            className="input"
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button size="large" className="color-button">
            로그인
          </button>
        </Form>
        <span>
          <Link to={`${FRONT_URL}/findPassword`}>비밀번호를 잊으셨나요?</Link>
        </span>
        <div className="option">
          <span>비밀번호 찾기</span>
          <div className="menu-line"></div>
          <span>회원가입</span>
        </div>
        <div className="social-form">
          <div
            style={{ backgroundColor: "#fee501", color: "black" }}
            className="color-button"
          >
            카카오로 시작하기
          </div>
          <div style={{ backgroundColor: "#02c75a" }} className="color-button">
            네이버로 시작하기
          </div>
          <div style={{ backgroundColor: "#39529a" }} className="color-button">
            페이스북으로 시작하기
          </div>
        </div>
      </FormWrapper>
    </LoginLayout>
  );
}

export default Login;

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const FormWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .input {
    margin-bottom: 10px;
    height: 4rem;
    width: 25rem;
    text-align: center;
    box-sizing: border-box;
    font-size: 1rem;
    border-radius: 5px;
    border: 2px solid #334b6c;
  }
  .color-button {
    margin-bottom: 10px;
    height: 4rem;
    width: 25rem;
    box-sizing: border-box;
    border-radius: 5px;
    background-color: #334b6c;
    color: white;
    border: none;
    font-size: 1.2rem;
    font-weight: 600;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  .title {
    font-size: 1.8rem;
    font-weight: 600;
    padding-bottom: 2.5rem;
  }
  .option {
    display: flex;
    align-items: center;
    padding-top: 50px;
    width: 350px;
    justify-content: center;
    span {
      padding: 0 20px;
      width: 100px;
      text-align: center;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .menu-line {
    width: 3px;
    height: 20px;
    background-color: #334b6c;
  }
  .social-form {
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
