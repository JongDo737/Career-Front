import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import styles from "./Signup.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import SchoolList from "../../components/List/SchoolList";
import CareerList from "../../components/List/CareerList";
import Image from "../../components/Image/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Signup(props) {
  // const [username, setUsername] = useState("");
  // const [id, setId] = useState("");
  // const [nickname, setNickname] = useState("");
  // const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(false);
  // const [gender, setGender] = useState(false);
  // const [intro, setIntro] = useState("");
  // const [phoneNumber, setphoneNumber] = useState("");
  const [numberCode, setNumberCode] = useState("");
  const [consult, setConsult] = useState([]);
  // const [careerPlan, setCareerPlan] = useState("");
  // const [hobby, setHobby] = useState("");
  const [profileImg, setProfileImg] = useState("/initProfileImg.jpg");
  const [visibleImg, setVisibleImg] = useState("/initProfileImg.jpg");
  const [user, setUser] = useState({
    name: "", //필수
    username: "", //필수
    nickname: "", //필수
    password: "", //필수
    birth: "", //필수
    gender: "", //필수
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
    console.log(e.target.files[0]);
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

    setUser((user) => ({
      ...user,
      schoolList: schoolList,
      careerList: careerList,
      tagList: [...tag],
    }));

    const formData = new FormData();
    formData.append("image", profileImg);

    const jsonData = {
      name: "seongae7", //필수
      username: "test7", //필수
      nickname: "seongae7", //필수
      password: "123", //필수
      birth: "20000505", //필수
      gender: "false", //필수
      schoolList: [
        {
          idx: 0,
          schoolType: "고등학교",
          schoolName: "한양",
          startDate: "20200101",
          endDate: "20210101",
          state: "졸업",
        },
        {
          idx: 1,
          schoolType: "대학교",
          schoolName: "한양",
          startDate: "20220101",
          endDate: "20230101",
          state: "졸업",
        },
      ],
      tagList: [
        {
          idx: 0,
          name: "컴퓨터",
        },
        { idx: 1, name: "전자" },
      ],
      careerList: [
        {
          idx: 0,
          careerType: "교내활동",
          careerName: "프로젝트",
          startDate: "20201010",
          endDate: "20201111",
          state: "수료",
        },
        {
          idx: 1,
          careerType: "교내활동",
          careerName: "프로젝트2",
          startDate: "20201010",
          endDate: "20201111",
          state: "수료",
        },
      ],
    };
    formData.append("json", JSON.stringify(jsonData));
    axios
      .post(
        `https://0b79-183-107-1-194.ngrok-free.app/user/signup/mentor`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // FormData를 사용할 때 필요한 헤더
          },
        }
      )
      .then((res) => {
        // axios
        //   .post(
        //     `https://d9cd-183-107-1-194.ngrok-free.app/user/signup/mentor`,
        //     {
        //       name: "seongae6", //필수
        //       username: "test6", //필수
        //       nickname: "seongae6", //필수
        //       password: "123", //필수
        //       birth: "20000505", //필수
        //       gender: "false", //필수
        //       schoolList: [
        //         {
        //           idx: 0,
        //           schoolType: "고등학교",
        //           schoolName: "한양",
        //           startDate: "20200101",
        //           endDate: "20210101",
        //           state: "졸업",
        //         },
        //         {
        //           idx: 1,
        //           schoolType: "대학교",
        //           schoolName: "한양",
        //           startDate: "20220101",
        //           endDate: "20230101",
        //           state: "졸업",
        //         },
        //       ],
        //       tagList: [
        //         {
        //           idx: 0,
        //           name: "컴퓨터",
        //         },
        //         { idx: 1, name: "전자" },
        //       ],
        //       careerList: [
        //         {
        //           idx: 0,
        //           careerType: "교내활동",
        //           careerName: "프로젝트",
        //           startDate: "20201010",
        //           endDate: "20201111",
        //           state: "수료",
        //         },
        //         {
        //           idx: 1,
        //           careerType: "교내활동",
        //           careerName: "프로젝트2",
        //           startDate: "20201010",
        //           endDate: "20201111",
        //           state: "수료",
        //         },
        //       ],
        //     }
        //   )
        //   .then((res) => {
        //     console.log(res);
        //     window.alert("success");
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     window.alert("error");
        //   });
        console.log(res);
        window.alert("success");
      })
      .catch((err) => {
        console.log(err);
        window.alert("error");
      });
  };

  const [tmpTag, setTmpTag] = useState("");
  const [tag, setTag] = useState([]);
  const tagIdx = useRef(0);
  const onUpdateTag = (value) => {
    setTag((current) => [...current, { idx: tagIdx.current, name: value }]);
    tagIdx.current += 1;
    console.log(tag);
  };
  const onDeleteTag = (idx) => {
    setTag(tag.filter((a) => a.idx !== idx));
  };
  return (
    <>
      <div className={styles.Title}>
        <MenuLine />
        <span>멘토 회원가입</span>
      </div>
      <HorizontalLine />
      <Form>
        <div className="FormHalf">
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>프로필 사진</span>
            </div>
            <img
              className={styles.ProfileImg}
              // src={user.profileImg}
              src={visibleImg}
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
                fontSize: "1.2rem",
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
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>소개글</span>
            </div>
            <Input
              placeholder="소개글을 작성하세요."
              size="large"
              height="150px"
              onChange={(e) =>
                setUser((user) => ({ ...user, introduce: e.target.value }))
              }
            />
            {/* <div className={styles.ButtonDiv}>
              <Button size="medium">저장하기</Button>
            </div> */}
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>커리어 목표</span>
            </div>
            <InputForm>
              <Input
                placeholder="당신의 커리어 목표는 무엇인가요."
                onChange={(e) =>
                  setUser((user) => ({ ...user, plan: e.target.value }))
                }
                size="large"
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>취미</span>
            </div>
            <InputForm>
              <Input
                placeholder="취미를 작성해 주세요."
                onChange={(e) =>
                  setUser((user) => ({ ...user, hobby: e.target.value }))
                }
                size="large"
              />
            </InputForm>
          </Wrapper>
        </div>
        <div className="FormHalf">
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>이름</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                placeholder="이름을 입력하세요."
                onChange={(e) =>
                  setUser((user) => ({ ...user, name: e.target.value }))
                }
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>아이디</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                placeholder="아이디를 입력하세요."
                onChange={(e) =>
                  setUser((user) => ({ ...user, username: e.target.value }))
                }
              />
              <Button>중복확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>닉네임</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                placeholder="닉네임을 입력하세요."
                // onChange={(e) => setNickname(e.target.value)}
                onChange={(e) =>
                  setUser((user) => ({ ...user, nickname: e.target.value }))
                }
              />
              <Button>중복확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>비밀번호</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
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
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>비밀번호 확인</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                type="password"
                placeholder="비밀번호를 다시 입력하세요."
                onChange={(e) => {
                  user.password === e.target.value
                    ? setConfirmPassword(true)
                    : setConfirmPassword(false);
                }}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>생년월일</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                type="date"
                placeholder="1900"
                onChange={(e) => {
                  setUser((user) => ({ ...user, birth: e.target.value }));
                }}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>전화번호</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                placeholder="전화번호를 입력하세요."
                onChange={(e) =>
                  setUser((user) => ({
                    ...user,
                    telephone: e.target.value,
                  }))
                }
              />
              <Button onClick={() => alert("인증코드가 전송되었습니다.")}>
                인증코드 전송
              </Button>
            </InputForm>
            <InputForm>
              <Input
                placeholder="인증코드를 입력하세요."
                onChange={(e) => setNumberCode(e.target.value)}
              />
              <Button>확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>성별</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <label className={styles.Label}>
                <input
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={
                    (e) => setUser((user) => ({ ...user, gender: true })) //true: 남자, false: 여자
                  }
                  className={styles.Radio}
                />
                <div>남자</div>
              </label>
              <label className={styles.Label}>
                <input
                  type="radio"
                  name="gender"
                  value="여자"
                  onChange={
                    (e) => setUser((user) => ({ ...user, gender: false })) //true: 남자, false: 여자
                  }
                  className={styles.Radio}
                />
                <div>여자</div>
              </label>
            </InputForm>
          </Wrapper>
        </div>
      </Form>
      {/* 여기는 아래 부분 */}
      <Form>
        <div className="Form50">
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>학력</span>
              <Required>*</Required>
            </div>
            <SchoolList schoolList={schoolList} setSchoolList={setSchoolList} />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>경력</span>
            </div>
            <CareerList careerList={careerList} setCareerList={setCareerList} />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>상담 학과 1</span>
              <Required>*</Required>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="첫번째 상담 학과를 입력하세요."
                onChange={(e) => {
                  setConsult({ ...consult, first: e.target.value });
                }}
              />
              <Button>등록</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>상담 학과 2</span>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="두번째 상담 학과를 입력하세요."
                onChange={(e) => {
                  setConsult({ ...consult, second: e.target.value });
                }}
              />
              <Button>등록</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>상담 학과 3</span>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="세번째 상담 학과를 입력하세요."
                onChange={(e) => {
                  setConsult({ ...consult, third: e.target.value });
                }}
              />
              <Button>등록</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>학력 증명</span>
              <Required>*</Required>
            </div>
            <div className={styles.FileUpload}>
              {careerFile.length ? (
                <div className={styles.FileList}>
                  {careerFile.map((file) => {
                    return (
                      <div key={file.idx} className={styles.FileItem}>
                        <span>{file.name}</span>
                        <FontAwesomeIcon
                          className={styles.Icon}
                          icon={faXmark}
                          onClick={() => onDeleteFile(file.idx)}
                        />
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div
                  className={styles.FileList}
                  style={{
                    color: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  <span>증명서를 첨부해 주세요.</span>
                  <span>(졸업 증명서, 재학 증명서, ... 택1)</span>
                </div>
              )}
              <label htmlFor="file" className={styles.UploadBtn}>
                업로드
              </label>
              <input
                multiple
                type="file"
                id="file"
                onChange={onUploadFile}
                style={{ display: "none" }}
                // disabled={isFile}
              />
            </div>
          </Wrapper>
        </div>
      </Form>
      <Form>
        <div className="FormHalf">
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>활동 사진</span>
            </div>
            <ImageWrapper>
              <Image />
              <Image />
              <Image />
              <Image />
              <Image />
              <Image />
            </ImageWrapper>
          </Wrapper>
        </div>
        <div className="FormHalf">
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>태그</span>
            </div>
            <InputForm>
              <Input
                width="200px"
                placeholder="태그명"
                onChange={(e) => {
                  setTmpTag(e.target.value);
                }}
              />
              <Button
                onClick={() => {
                  onUpdateTag(tmpTag);
                }}
              >
                추가
              </Button>
            </InputForm>
            <TagWrapper>
              {tag.length
                ? tag.map((item) => {
                    return (
                      <>
                        <Tag>
                          <span className="full-name">{item.name}</span>
                          <span className="short-name">#{item.name}</span>
                          <FontAwesomeIcon
                            onClick={() => onDeleteTag(item.idx)}
                            className="delete-icon"
                            icon={faXmark}
                          />
                        </Tag>
                      </>
                    );
                  })
                : ""}
            </TagWrapper>
          </Wrapper>
        </div>
      </Form>
      <Form>
        <div className={styles.ButtonDiv} style={{ marginBottom: "100px" }}>
          <Button onClick={onSubmit} size="large">
            회원가입
          </Button>
        </div>
      </Form>
    </>
  );
}

export default Signup;

const InputForm = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  min-width: 30rem;
`;

const Form = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 60px;
  justify-content: center;
  .FormHalf {
    min-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 5rem;
  }
  .Form50 {
    min-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 8rem);
  grid-template-rows: repeat(2, 8rem);
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 2rem 0;
`;
const Tag = styled.div`
  width: 6rem;
  height: 2rem;
  border: 1px solid #334b6c;
  border-radius: 10px;
  background-color: #334b6c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 0 0.5rem;
  position: relative;
  .short-name {
    width: 70%;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .full-name {
    /* visibility: hidden; */
    position: absolute;
    bottom: 2.2rem;
    color: black;
    background-color: #d5d5d5;
    visibility: hidden;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
    text-align: center;
  }
  &:hover {
    .full-name {
      visibility: visible;
    }
  }
  .delete-icon {
    cursor: pointer;
  }
`;

const Required = styled.span`
  color: red;
`;
