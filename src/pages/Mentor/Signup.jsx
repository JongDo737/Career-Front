import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import { SV_LOCAL } from "../../constants";
import { colors } from "../../styles/common/Theme";
import { useNavigate } from "react-router-dom";
import { checkValidNickname, checkValidUsername } from "../../api/checkValid";
function Signup() {
  const navigator = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [validNickname, setValidNickname] = useState(false);
  const [numberCode, setNumberCode] = useState("");
  const [consult, setConsult] = useState([]);
  const [profileImg, setProfileImg] = useState("/initProfileImg.jpg");
  const [visibleImg, setVisibleImg] = useState("/initProfileImg.jpg");
  const [user, setUser] = useState({
    name: "", //필수
    username: "", //필수
    nickname: "", //필수
    password: "", //필수
    birth: "", //필수
    gender: true, //필수
    introduce: "",
    telephone: "",
    consultMajor1: "",
    consultMajor2: "",
    consultMajor3: "",
    plan: "",
    hobby: "",
    // profileImg:
    //   "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    schoolList: [],
    careerList: [],
    tagList: [],
    email: "",
    // activeImg: [],
  });
  const [schoolList, setSchoolList] = useState([
    {
      idx: 0,
      school: "고등학교",
      schoolName: "",
      startDate: "",
      endDate: "",
      state: "졸업",
    },
  ]);
  const [careerList, setCareerList] = useState([
    {
      idx: 0,
      career: "교내활동",
      careerName: "",
      startDate: "",
      endDate: "",
      state: "수료",
    },
  ]);

  const [careerFile, setCareerFile] = useState([]);
  const [isFile, setIsFile] = useState(false);
  const fileInput = useRef(null);

  const onChangeImg = (e) => {
    if (e.target.files[0]) setProfileImg(e.target.files[0]);
    // setUser((user) => ({ ...user, profileImg: e.target.files[0] }));
    else return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setVisibleImg(reader.result);

      // setUser((user) => ({ ...user, profileImg: reader.result }));
      // setProfileImg(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onResetImg = () => {
    // setUser((user) => ({
    //   ...user,
    //   profileImg:
    //     "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
    // }));
    setProfileImg("/initProfileImg.jpg");
    setVisibleImg("/initProfileImg.jpg");
  };

  const fileUploadIdx = useRef(0);
  const onUploadFile = (e) => {
    //재학 증명서 업로드
    if (!e.target.files?.length) return;
    const files = e.target.files;
    const len = files.length;

    for (let i = 0; i < len; i++) {
      const file_name = files[i].name.toLowerCase();
      setCareerFile((current) => {
        return [
          ...current,
          { idx: fileUploadIdx.current + i, name: file_name },
        ];
      });
    }
    e.target.value = ""; //for firing onChange;
    setIsFile(true);
  };

  useEffect(() => {
    fileUploadIdx.current = careerFile.length;
  }, [careerFile]);

  const onDeleteFile = (idx) => {
    setCareerFile(careerFile.filter((a) => a.idx !== idx));
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (!validUsername) window.alert("아이디 중복확인이 필요합니다.");
    else if (!validNickname) window.alert("닉네임 중복확인이 필요합니다.");
    else if (!confirmPassword) window.alert("비밀번호가 일치하지 않습니다.");
    else {
      setUser((user) => ({
        ...user,
        schoolList: schoolList,
        careerList: careerList,
        tagList: [...tag],
      }));

      const formData = new FormData();
      // formData.append("image", profileImg);

      const jsonData = {
        name: user.name, //필수
        username: user.username, //필수
        nickname: user.nickname, //필수
        password: user.password, //필수
        telephone: user.telephone,
        birth: user.birth.replace(/-/g, ""), //필수
        gender: user.gender, //필수
        isTutor: true,
        email: user.email,
      };
      formData.append("json", JSON.stringify(jsonData));
      axios
        .post(`${SV_LOCAL}/user/signup/mentor`, jsonData)
        .then((res) => {
          window.alert("멘토 회원가입이 완료되었습니다.");
          navigator("/");
        })
        .catch((err) => {
          console.error(err);
          window.alert("회원가입에 실패하였습니다. 다시 시도해 주세요.");
        });
    }
  };

  const [tag, setTag] = useState([]);
  const tagIdx = useRef(0);
  const onUpdateTag = (value) => {
    setTag((current) => [...current, { idx: tagIdx.current, name: value }]);
    tagIdx.current += 1;
  };
  const onDeleteTag = (idx) => {
    setTag(tag.filter((a) => a.idx !== idx));
  };
  return (
    <>
      <Title>
        <MenuLine />
        <span>멘토 회원가입</span>
      </Title>
      <HorizontalLine />
      {/* 여기는 아래 부분 */}
      <Form onSubmit={onSubmit}>
        <div className="Form50">
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>이름</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                placehaolder="이름을 입력하세요."
                onChange={(e) =>
                  setUser((user) => ({ ...user, name: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>아이디</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                placeholder="아이디를 입력하세요."
                onChange={(e) => {
                  setUser((user) => ({ ...user, username: e.target.value }));
                  setValidUsername(undefined);
                }}
              />
              <Button
                height="3rem"
                onClick={() => {
                  checkValidUsername(user.username).then((res) =>
                    setValidUsername(res)
                  );
                }}
                disabled={validUsername}
              >
                중복확인
              </Button>
            </InputForm>
            <div className="valid-wrapper">
              {validUsername === undefined && user.username && (
                <span>아이디 중복확인이 필요합니다.</span>
              )}
              {validUsername === false && user.username && (
                <span>이미 사용중인 아이디입니다.</span>
              )}
            </div>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>닉네임</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                placeholder="닉네임을 입력하세요."
                onChange={(e) => {
                  setUser((user) => ({ ...user, nickname: e.target.value }));
                  setValidNickname(undefined);
                }}
              />
              <Button
                height="3rem"
                onClick={() => {
                  checkValidNickname(user.nickname).then((res) =>
                    setValidNickname(res)
                  );
                }}
                disabled={validNickname}
              >
                중복확인
              </Button>
            </InputForm>
            <div className="valid-wrapper">
              {validNickname === undefined && user.nickname && (
                <span>닉네임 중복확인이 필요합니다.</span>
              )}
              {validNickname === false && user.nickname && (
                <span>이미 사용중인 닉네임입니다.</span>
              )}
            </div>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>비밀번호</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                type="password"
                placeholder="비밀번호를 입력하세요."
                // onChange={(e) => setPassword(e.target.value)}
                onChange={(e) =>
                  setUser((user) => ({ ...user, password: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>비밀번호 확인</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                type="password"
                placeholder="비밀번호를 다시 입력하세요."
                onChange={(e) => {
                  user.password === e.target.value
                    ? setConfirmPassword(true)
                    : setConfirmPassword(false);
                }}
              />
            </InputForm>
            {!confirmPassword && user.password && (
              <div className="valid-wrapper">
                <span>비밀번호가 일치하지 않습니다.</span>
              </div>
            )}
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>생년월일</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                type="date"
                placeholder="1900"
                onChange={(e) => {
                  setUser((user) => ({ ...user, birth: e.target.value }));
                }}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>전화번호</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                placeholder="010-1234-5678"
                onChange={(e) =>
                  setUser((user) => ({
                    ...user,
                    telephone: e.target.value,
                  }))
                }
              />
              <Button
                height="3rem"
                onClick={() => alert("인증코드가 전송되었습니다.")}
              >
                인증코드 전송
              </Button>
            </InputForm>
            <InputForm>
              <Input
                required={true}
                placeholder="인증코드를 입력하세요."
                onChange={(e) => setNumberCode(e.target.value)}
              />
              <Button height="3rem">확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>이메일</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                required={true}
                placeholder="이메일을 입력하세요."
                type="email"
                onChange={(e) =>
                  setUser((user) => ({ ...user, email: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className="signup-subtitle">
              <MenuLine size="small" />
              <span>성별</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <label className="signup-input__label">
                <input
                  required
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={
                    () => setUser((user) => ({ ...user, gender: true })) //true: 남자, false: 여자
                  }
                  className="signup-input__radio"
                  checked={user.gender}
                />
                <div>남자</div>
              </label>
              <label className="signup-input__label">
                <input
                  type="radio"
                  name="gender"
                  value="여자"
                  onChange={
                    (e) => setUser((user) => ({ ...user, gender: false })) //true: 남자, false: 여자
                  }
                  className="signup-input__radio"
                />
                <div>여자</div>
              </label>
            </InputForm>
          </Wrapper>
        </div>
        <button className="signup-submit__btn">회원가입</button>
      </Form>
    </>
  );
}

export default Signup;

const InputForm = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
  .signup-input__radio {
    width: 1.5rem;
    height: 1.5rem;
    margin: 0;
  }
  .signup-input__label {
    width: 10rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid gray;
    color: gray;
    border-radius: 5px;
    box-sizing: border-box;
    &:hover {
      border: 2px solid #2f5383;
    }
    &:hover div,
    input:checked + div {
      color: #2f5383;
      font-weight: 600;
    }
    div {
      margin: 0 10px;
      height: 25px;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
    }
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  .signup-subtitle {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: 1.3rem;
    span {
      margin-left: 1rem;
    }
  }
  > .valid-wrapper {
    display: flex;
    flex-direction: column;
    > span {
      font-size: 1.1rem;
      font-weight: 500;
      color: ${colors.primaryBlue};
    }
  }
`;

const Form = styled.form`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 60px;
  flex-direction: column;
  align-items: center;
  .FormHalf {
    min-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5rem;
  }
  .Form50 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .signup-submit__btn {
    background-color: ${colors.primaryBlue};
    color: white;
    padding: 1rem;
    width: 20rem;
    margin: 5rem 0;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const Required = styled.span`
  color: red;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.7rem;
  font-weight: 600;
  width: 15rem;
  justify-content: space-evenly;
  padding: 1.2rem 2.3rem;
`;
