import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import styles from "./SignupStudent.module.scss";
function SignupStudent(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const fileInput = useRef(null);

  const onChangeImg = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
    else return;

    const reader = new FileReader();
    reader.onload = () => {
      console.log(reader);
      if (reader.readyState === 2) setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onResetImg = () => {
    setImage(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  };
  const onSubmit = (e) => {
    e.preventDefault();
    // if (!confirmPassword) {
    //   window.alert("비밀번호가 일치하지 않습니다.");
    //   return;
    // }
    console.log(username, password, nickname, gender);
    axios
      .post(`${process.env.REACT_APP_SV_HOST}/user/signup`, {
        username: username,
        password: password,
        nickname: nickname,
        gender: true,
        telephone: "010",
        name: "seesees",
      })
      .then((res) => {
        console.log(res);
        window.alert("success");
      })
      .catch((err) => {
        console.log(err);
        window.alert("error");
      });
  };
  return (
    <div className={styles.Total}>
      <div className={styles.Title}>
        <div className={styles.VerticalLine}></div>
        <span>멘티 회원가입</span>
      </div>
      <hr className={styles.horizontalLine} />
      <div className={styles.Form} action="">
        <div className={styles.FormHalf}>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>프로필 사진</span>
          </div>
          <img
            className={styles.ProfileImg}
            src={image}
            alt=""
            onClick={() => {
              fileInput.current.click();
            }}
          />
          <span
            style={{
              width: "200px",
              textAlign: "center",
              color: "#334b6c",
              cursor: "pointer",
              fontWeight: "600",
              marginBottom: "40px",
            }}
            onClick={onResetImg}
          >
            이미지 삭제하기
          </span>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onChangeImg}
            ref={fileInput}
          />
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>소개글</span>
          </div>
          <input
            type="text"
            placeholder="소개글을 작성하세요."
            className={styles.IntroInput}
          />
        </div>
        <div className={styles.FormHalf}>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>아이디</span>
          </div>
          <div className={styles.InputForm}>
            <input
              type="text"
              placeholder="아이디를 입력하세요."
              onChange={(e) => setUsername(e.target.value)}
              className={styles.Input}
            />
            <button className={[styles.Button, styles.Input].join(" ")}>
              중복확인
            </button>
          </div>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>닉네임</span>
          </div>
          <div className={styles.InputForm}>
            <input
              type="text"
              placeholder="닉네임을 입력하세요."
              onChange={(e) => setNickname(e.target.value)}
              className={styles.Input}
            />
            <button className={[styles.Button, styles.Input].join(" ")}>
              중복확인
            </button>
          </div>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>비밀번호</span>
          </div>
          <div className={styles.InputForm}>
            <input
              type="text"
              placeholder="비밀번호를 입력하세요."
              onChange={(e) => setPassword(e.target.value)}
              className={styles.Input}
            />
          </div>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>비밀번호 확인</span>
          </div>
          <div className={styles.InputForm}>
            <input
              type="text"
              placeholder="비밀번호를 다시 입력하세요."
              onChange={(e) => {
                password === e.target.value
                  ? setConfirmPassword(true)
                  : setConfirmPassword(false);
              }}
              className={styles.Input}
            />
          </div>

          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>성별</span>
          </div>
          <div className={styles.InputForm}>
            <label className={styles.Label}>
              <input
                type="radio"
                name="gender"
                value="남자"
                onChange={(e) => setGender(true)}
                className={styles.Radio}
              />
              <div>남자</div>
            </label>
            <label className={styles.Label}>
              <input
                type="radio"
                name="gender"
                value="여자"
                placeholder="닉네임을 입력하세요."
                onChange={(e) => setGender(false)}
                className={styles.Radio}
              />
              <div>여자</div>
            </label>
          </div>
        </div>
      </div>
      <div className={styles.Form} action="">
        <div className={styles.FormHalf}>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>관심학과1</span>
          </div>
          <select id="major1" className={styles.Select}>
            <option name="major1" value="a">
              경영학과
            </option>
            <option name="major1" value="b">
              수학과
            </option>
            <option name="major1" value="c">
              영어교육과
            </option>
            <option name="major1" value="d">
              전자공학과
            </option>
            <option name="major1" value="e">
              컴퓨터공학과
            </option>
          </select>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>관심학과2</span>
          </div>
          <select id="major2" className={styles.Select}>
            <option name="major2" value="a">
              경영학과
            </option>
            <option name="major2" value="b">
              수학과
            </option>
            <option name="major2" value="c">
              영어교육과
            </option>
            <option name="major2" value="d">
              전자공학과
            </option>
            <option name="major2" value="e">
              컴퓨터공학과
            </option>
          </select>
          <div className={styles.Subtitle}>
            <div className={styles.VerticalLineSmall}></div>
            <span>관심학과3</span>
          </div>
          <select id="major3" className={styles.Select}>
            <option name="major3" value="a">
              경영학과
            </option>
            <option name="major3" value="b">
              수학과
            </option>
            <option name="major3" value="c">
              영어교육과
            </option>
            <option name="major3" value="d">
              전자공학과
            </option>
            <option name="major3" value="e">
              컴퓨터공학과
            </option>
          </select>
          <div className={styles.ButtonDiv}>
            <button onClick={onSubmit} className={styles.Button}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupStudent;
