import React from "react";
import { useState } from "react";
import styles from "./LoginStudent.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
function LoginStudent(props) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_SV_HOST}/user/signin`, {
        username: id,
        password: password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.success) window.alert("success");
        else window.alert("로그인 정보가 없습니다.");
      })
      .catch((err) => {
        console.log(err);
        window.alert("error");
      });
  };
  return (
    <div className={styles.Total}>
      <div className={styles.Form}>
        <span className={styles.Title}>로그인</span>
        <form action="" onSubmit={onSubmit}>
          <input
            className={styles.Input}
            type="text"
            placeholder="아이디를 입력하세요."
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            className={styles.Input}
            type="password"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className={[styles.Button, styles.Input].join(" ")}>
            로그인
          </button>
        </form>
        <span>
          <Link to={"http://localhost:3000/findPassword"}>
            비밀번호를 잊으셨나요?
          </Link>
        </span>
        <div className={styles.Option}>
          <span>비밀번호 찾기</span>
          <div className={styles.VerticalLine}></div>
          <span>회원가입</span>
        </div>
        <div className={styles.SocialForm}>
          <button
            className={[styles.Button, styles.Input, styles.Yellow].join(" ")}
          >
            카카오로 시작하기
          </button>
          <button
            className={[styles.Button, styles.Input, styles.Green].join(" ")}
          >
            네이버로 시작하기
          </button>
          <button
            className={[styles.Button, styles.Input, styles.Blue].join(" ")}
          >
            페이스북으로 시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginStudent;
