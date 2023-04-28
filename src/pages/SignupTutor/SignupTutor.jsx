import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import DatePicker from "react-datepicker";
import Button from "../../components/Button/Button";
import VerticalLine from "../../components/Line/VerticalLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import styles from "./SignupTutor.module.scss";
function SignupTutor(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
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
    <>
      <div className={styles.Title}>
        <VerticalLine />
        <span>멘토 회원가입</span>
      </div>
      <HorizontalLine />
      <div className={styles.Form} action="">
        <div className={styles.FormHalf}>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
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
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>소개글</span>
            </div>
            <Input
              placeholder="소개글을 작성하세요."
              size="large"
              height="150px"
            />
            <div className={styles.ButtonDiv}>
              <Button size="medium">저장하기</Button>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>커리어 목표</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="당신의 커리어 목표는 무엇인가요."
                onChange={(e) => setUsername(e.target.value)}
                size="large"
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>취미</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="취미를 작성해 주세요."
                onChange={(e) => setUsername(e.target.value)}
                size="large"
              />
            </div>
          </div>
        </div>
        <div className={styles.FormHalf}>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>이름</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="이름을 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>아이디</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="아이디를 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button>중복확인</Button>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>닉네임</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="닉네임을 입력하세요."
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button>중복확인</Button>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>비밀번호</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="비밀번호를 입력하세요."
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>비밀번호 확인</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="비밀번호를 다시 입력하세요."
                onChange={(e) => {
                  password === e.target.value
                    ? setConfirmPassword(true)
                    : setConfirmPassword(false);
                }}
              />
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>전화번호</span>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="010"
                size="small"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="1234"
                size="small"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Input
                placeholder="5678"
                size="small"
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button>인증코드 전송</Button>
            </div>
            <div className={styles.InputForm}>
              <Input
                placeholder="인증코드를 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button>확인</Button>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
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
      </div>
      {/* 여기는 아래 부분 */}
      <div className={styles.Form} action="">
        <div className={styles.Form50}>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>학력</span>
            </div>
            <div className={styles.InputForm}>
              <select name="school" className={styles.schoolSelect}>
                <option name="school" value="a">
                  고등학교
                </option>
                <option name="school" value="b">
                  대학교
                </option>
              </select>
              <Input placeholder="학교명" size="small" width="150px" />
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
              <Input placeholder="2000.01" size="small" />
              <Input placeholder="2000.01" size="small" />

              <select name="school">
                <option name="school" value="a">
                  졸업
                </option>
                <option name="school" value="b">
                  졸업예정
                </option>
                <option name="school" value="b">
                  재학
                </option>
                <option name="school" value="b">
                  휴학
                </option>
              </select>
            </div>
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
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
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
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
          </div>
          <div className={styles.wrapper}>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
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
          </div>
          <div className={styles.ButtonDiv}>
            <Button onClick={onSubmit} size="large">
              회원가입
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupTutor;
