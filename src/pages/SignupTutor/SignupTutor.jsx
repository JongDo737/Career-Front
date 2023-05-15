import React from "react";
import axios from "axios";
import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button/Button";
import VerticalLine from "../../components/Line/VerticalLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import styles from "./SignupTutor.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import SchoolList from "../../components/List/SchoolList";
import CareerList from "../../components/List/CareerList";
import Image from "../../components/Image/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
function SignupTutor(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState(false);
  const [schoolList, setSchoolList] = useState([
    {
      id: 0,
      school: "고등학교",
      schoolName: "",
      startDate: "",
      endDate: "",
      state: "졸업",
    },
  ]);
  const [careerList, setCareerList] = useState([
    {
      id: 0,
      career: "교내활동",
      careerName: "",
      startDate: "",
      endDate: "",
      state: "수료",
    },
  ]);
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [image, setImage] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [careerFile, setCareerFile] = useState([]);
  const [isFile, setIsFile] = useState(false);
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

  const fileUploadId = useRef(0);
  const onUploadFile = (e) => {
    if (!e.target.files?.length) return;
    const files = e.target.files;
    const len = files.length;

    for (let i = 0; i < len; i++) {
      const file_name = files[i].name.toLowerCase();
      setCareerFile((current) => {
        return [...current, { id: fileUploadId.current + i, name: file_name }];
      });
    }
    // const formData = new FormData();
    // formData.append("file", file);
    e.target.value = ""; //for firing onChange;
    setIsFile(true);
  };

  useEffect(() => {
    fileUploadId.current = careerFile.length;
  }, [careerFile]);

  const onDeleteFile = (id) => {
    setCareerFile(careerFile.filter((a) => a.id !== id));
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

  const [tmpTag, setTmpTag] = useState("");
  const [tag, setTag] = useState([]);
  const tagId = useRef(0);
  const onUpdateTag = (value) => {
    console.log("click");
    setTag((current) => [...current, { id: tagId.current, name: value }]);
    tagId.current += 1;
    console.log(tag);
  };
  const onDeleteTag = (id) => {
    setTag(tag.filter((a) => a.id !== id));
  };
  return (
    <>
      <div className={styles.Title}>
        <VerticalLine />
        <span>멘토 회원가입</span>
      </div>
      <HorizontalLine />
      <Form>
        <div className="FormHalf">
          <Wrapper>
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
          </Wrapper>
          <Wrapper>
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
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>커리어 목표</span>
            </div>
            <InputForm>
              <Input
                placeholder="당신의 커리어 목표는 무엇인가요."
                onChange={(e) => setUsername(e.target.value)}
                size="large"
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>취미</span>
            </div>
            <InputForm>
              <Input
                placeholder="취미를 작성해 주세요."
                onChange={(e) => setUsername(e.target.value)}
                size="large"
              />
            </InputForm>
          </Wrapper>
        </div>
        <div className="FormHalf">
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>이름</span>
            </div>
            <InputForm>
              <Input
                placeholder="이름을 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>아이디</span>
            </div>
            <InputForm>
              <Input
                placeholder="아이디를 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button>중복확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>닉네임</span>
            </div>
            <InputForm>
              <Input
                placeholder="닉네임을 입력하세요."
                onChange={(e) => setNickname(e.target.value)}
              />
              <Button>중복확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>비밀번호</span>
            </div>
            <InputForm>
              <Input
                placeholder="비밀번호를 입력하세요."
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>비밀번호 확인</span>
            </div>
            <InputForm>
              <Input
                placeholder="비밀번호를 다시 입력하세요."
                onChange={(e) => {
                  password === e.target.value
                    ? setConfirmPassword(true)
                    : setConfirmPassword(false);
                }}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>전화번호</span>
            </div>
            <InputForm>
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
            </InputForm>
            <InputForm>
              <Input
                placeholder="인증코드를 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button>확인</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>성별</span>
            </div>
            <InputForm>
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
            </InputForm>
          </Wrapper>
        </div>
      </Form>
      {/* 여기는 아래 부분 */}
      <Form>
        <div className="Form50">
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>학력</span>
            </div>

            <SchoolList schoolList={schoolList} setSchoolList={setSchoolList} />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>경력</span>
            </div>
            <CareerList careerList={careerList} setCareerList={setCareerList} />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>상담 학과 1</span>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="첫번째 상담학과를 입력하세요."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Button>등록</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>상담 학과 2</span>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="두번째 상담학과를 입력하세요."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Button>등록</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>상담 학과 3</span>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="세번째 상담학과를 입력하세요."
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <Button>등록</Button>
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <VerticalLine size="small" />
              <span>학력 증명</span>
            </div>
            <div className={styles.FileUpload}>
              {careerFile.length ? (
                <div className={styles.FileList}>
                  {careerFile.map((file) => {
                    return (
                      <div key={file.id} className={styles.FileItem}>
                        <span>{file.name}</span>
                        <FontAwesomeIcon
                          className={styles.Icon}
                          icon={faXmark}
                          onClick={() => onDeleteFile(file.id)}
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
              <VerticalLine size="small" />
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
              <VerticalLine size="small" />
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
                            onClick={() => onDeleteTag(item.id)}
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
        <div className={styles.ButtonDiv}>
          <Button onClick={onSubmit} size="large">
            회원가입
          </Button>
        </div>
      </Form>
    </>
  );
}

export default SignupTutor;

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
`;

const Form = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  margin-top: 60px;
  justify-content: space-evenly;
  .FormHalf {
    min-width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
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
