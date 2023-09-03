import React, { Fragment } from "react";
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
import {
  faXmark,
  faStar as faStarFull,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
const Profile = (props) => {
  const [username, setUsername] = useState("김성애");
  const [id, setId] = useState("seongaekim513");
  const [nickname, setNickname] = useState("김사장");
  const [password, setPassword] = useState({
    first: "010",
    second: "3941",
    third: "9805",
  });
  const [confirmPassword, setConfirmPassword] = useState(false);
  const [gender, setGender] = useState(false);
  const [intro, setIntro] = useState("안녕하세요. 김사장입니다.");
  const [phoneNumber, setphoneNumber] = useState({
    first: "010",
    second: "3941",
    third: "9805",
  });
  const [numberCode, setNumberCode] = useState("");
  const [consult, setConsult] = useState({
    first: "컴퓨터공학과",
    second: "전자공학과",
    third: "화학공학과",
  });
  const [careerPlan, setCareerPlan] = useState(
    "뛰어난 프론트엔드 개발자가 목표입니다."
  );
  const [hobby, setHobby] = useState("코딩");
  const [view, setView] = useState(true);
  const [schoolList, setSchoolList] = useState([
    {
      id: 0,
      school: "고등학교",
      schoolName: "한양고등학교",
      startDate: new Date("2014-03-01"),
      endDate: new Date("2017-02-07"),
      state: "졸업",
    },
    {
      id: 1,
      school: "대학교",
      schoolName: "한양대학교",
      startDate: new Date("2018-03-01"),
      endDate: new Date("2023-02-17"),
      state: "졸업",
      majorList: [
        {
          id: 0,
          unit: "주전공",
          major: "컴퓨터소프트웨어학부",
        },
        {
          id: 1,
          unit: "복수전공",
          major: "화학공학과",
        },
      ],
    },
  ]);
  const [careerList, setCareerList] = useState([
    {
      id: 0,
      career: "인턴",
      careerName: "voronoi 연구단",
      startDate: new Date("2022-09-01"),
      endDate: new Date("2023-02-28"),
      state: "퇴사",
      content:
        "단백질 구조 시각화를 위한 웹페이지 제작에 디자이너 및 프론트엔드 개발자로 참여함.",
    },
    {
      id: 1,
      career: "프로젝트",
      careerName: "Carry-A-Way",
      startDate: new Date("2023-02-01"),
      endDate: new Date("2023-06-30"),
      state: "완료",
    },
  ]);

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
  const onChange = (e) => {
    e.preventDefault();
    setView((current) => !current);
  };

  const [tmpTag, setTmpTag] = useState("");
  const [tag, setTag] = useState([
    { id: 0, name: "머신러닝" },
    { id: 1, name: "앱개발" },
    { id: 2, name: "안드로이드" },
    { id: 3, name: "알고리즘" },
  ]);
  const tagId = useRef(tag.length - 1);
  const onUpdateTag = (value) => {
    setTag((current) => [...current, { id: tagId.current, name: value }]);
    tagId.current += 1;
  };
  const onDeleteTag = (id) => {
    setTag(tag.filter((a) => a.id !== id));
  };

  const review = [
    {
      writer: "신종민",
      content: "멘토님 너무 친절하고 재밌으셔서 시간 가는 줄 몰랐습니다.",
      score: 5,
    },
    {
      writer: "한재준",
      content: "상담비가 전혀 아깝지 않을 정도로 열정적이세요.",
      score: 5,
    },
    {
      writer: "채희문",
      content:
        "멘토님은 정말 좋으세요. 하지만 사전질문에 대한 답변을 듣지 못해 아쉬웠어요. 다음 상담을 기대해보겠습니다!",
      score: 4,
    },
  ];
  const scoreToStar = (score) => {
    const scoreList = [];
    for (var i = 0; i < Number(score); i++) {
      scoreList.push(<FontAwesomeIcon icon={faStarFull} />);
    }
    for (var j = 0; j < 5 - Number(score); j++) {
      scoreList.push(<FontAwesomeIcon icon={faStar} />);
    }
    return scoreList;
  };

  const averageScore = () => {
    var sum = 0;
    for (var i = 0; i < review.length; i++) {
      sum += review[i].score;
    }
    return Math.round((sum / review.length) * 10) / 10;
  };
  return (
    <>
      <div className={styles.Title}>
        <MenuLine />
        <span>내 프로필</span>
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
              {!view && "이미지 삭제하기"}
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              accept="image/jpg, image/jpeg, image/png"
              onChange={onChangeImg}
              ref={fileInput}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>소개글</span>
            </div>
            <Input
              size="large"
              value={intro}
              placeholder="소개글을 작성하세요."
              onChange={(e) => setIntro(e.target.value)}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>커리어 목표</span>
            </div>
            <InputForm>
              <Input
                size="large"
                value={careerPlan}
                placeholder="당신의 커리어 목표는 무엇인가요."
                onChange={(e) => setCareerPlan(e.target.value)}
                disabled={view}
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
                size="large"
                value={hobby}
                placeholder="취미를 작성해 주세요."
                onChange={(e) => setHobby(e.target.value)}
                disabled={view}
              />
            </InputForm>
          </Wrapper>
        </div>
        <div className="FormHalf">
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>이름</span>
            </div>
            <InputForm>
              <Input
                value={username}
                placeholder="이름을 입력하세요."
                onChange={(e) => setUsername(e.target.value)}
                disabled={view}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>아이디</span>
            </div>
            <InputForm>
              <Input
                placeholder="아이디를 입력하세요."
                onChange={(e) => setId(e.target.value)}
                value={id}
                disabled={view}
              />
              {!view && <Button>중복확인</Button>}
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>닉네임</span>
            </div>
            <InputForm>
              <Input
                value={nickname}
                placeholder="닉네임을 입력하세요."
                onChange={(e) => setNickname(e.target.value)}
                disabled={view}
              />
              {!view && <Button>중복확인</Button>}
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>비밀번호</span>
            </div>
            <InputForm>
              <Input
                type="password"
                value={password}
                placeholder="비밀번호를 입력하세요."
                onChange={(e) => setPassword(e.target.value)}
                disabled={view}
              />
            </InputForm>
          </Wrapper>
          {!view && (
            <Wrapper>
              <div className={styles.Subtitle}>
                <MenuLine size="small" />
                <span>비밀번호 확인</span>
              </div>
              <InputForm>
                <Input
                  type="password"
                  value={password}
                  placeholder="비밀번호를 다시 입력하세요."
                  onChange={(e) => {
                    password === e.target.value
                      ? setConfirmPassword(true)
                      : setConfirmPassword(false);
                  }}
                />
              </InputForm>
            </Wrapper>
          )}
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>전화번호</span>
            </div>
            <InputForm>
              <Input
                size="small"
                value={phoneNumber.first}
                onChange={(e) =>
                  setphoneNumber({ ...phoneNumber, first: e.target.value })
                }
                disabled={view}
              />
              <Input
                size="small"
                value={phoneNumber.second}
                onChange={(e) =>
                  setphoneNumber({ ...phoneNumber, second: e.target.value })
                }
                disabled={view}
              />
              <Input
                size="small"
                value={phoneNumber.third}
                onChange={(e) =>
                  setphoneNumber({ ...phoneNumber, third: e.target.value })
                }
                disabled={view}
              />
              {!view && <Button>인증코드 전송</Button>}
            </InputForm>
            {!view && (
              <InputForm>
                <Input
                  placeholder="인증코드를 입력하세요."
                  onChange={(e) => setNumberCode(e.target.value)}
                />
                <Button>확인</Button>
              </InputForm>
            )}
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>성별</span>
            </div>
            <InputForm>
              <label
                className={styles.Label}
                style={{ pointerEvents: view ? "none" : "" }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={(e) => setGender(true)}
                  className={styles.Radio}
                  checked={gender}
                  disabled={view}
                />
                <div style={{ color: view ? "gray" : "", fontSize: "1.3rem" }}>
                  남자
                </div>
              </label>
              <label
                className={styles.Label}
                style={{ pointerEvents: view ? "none" : "" }}
              >
                <input
                  type="radio"
                  name="gender"
                  value="여자"
                  placeholder="닉네임을 입력하세요."
                  onChange={(e) => setGender(false)}
                  className={styles.Radio}
                  checked={!gender}
                  disabled={view}
                />
                <div style={{ color: view ? "gray" : "", fontSize: "1.3rem" }}>
                  여자
                </div>
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
            </div>
            <SchoolList
              schoolList={schoolList}
              setSchoolList={setSchoolList}
              view={view}
            />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>경력</span>
            </div>
            <CareerList
              careerList={careerList}
              setCareerList={setCareerList}
              view={view}
            />
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
              <span>상담 학과 1</span>
            </div>
            <InputForm>
              <Input
                size="large"
                placeholder="첫번째 상담 학과를 입력하세요."
                onChange={(e) => {
                  setConsult({ ...consult, first: e.target.value });
                }}
                value={consult.first}
                disabled={view}
              />
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
                value={consult.second}
                disabled={view}
              />
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
                value={consult.third}
                disabled={view}
              />
            </InputForm>
          </Wrapper>
          <Wrapper>
            <div className={styles.Subtitle}>
              <MenuLine size="small" />
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
              {!view && (
                <label
                  htmlFor="file"
                  className={styles.UploadBtn}
                  style={{ pointerEvents: view ? "none" : "" }}
                >
                  업로드
                </label>
              )}
              <input
                multiple
                type="file"
                id="file"
                onChange={onUploadFile}
                style={{ display: "none" }}
                // disabled={isFile}
                disabled={view}
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
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
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
                disabled={view}
              />
              {!view && (
                <Button
                  onClick={() => {
                    onUpdateTag(tmpTag);
                  }}
                >
                  추가
                </Button>
              )}
            </InputForm>
            <TagWrapper>
              {tag.length
                ? tag.map((item) => {
                    return (
                      <Fragment key={item.id}>
                        <Tag>
                          <span className="full-name">{item.name}</span>
                          <span className="short-name">#{item.name}</span>
                          {!view && (
                            <FontAwesomeIcon
                              onClick={() => onDeleteTag(item.id)}
                              className="delete-icon"
                              icon={faXmark}
                            />
                          )}
                        </Tag>
                      </Fragment>
                    );
                  })
                : ""}
            </TagWrapper>
          </Wrapper>
        </div>
      </Form>
      {view && (
        <Form>
          <div className="Form50">
            <Wrapper>
              {/* pagination 추가해야함 */}
              <div className={styles.Subtitle}>
                <MenuLine size="small" />
                <span>나에 대한 리뷰</span>
              </div>
              <ScoreTable>
                <tr>
                  <th>총 리뷰: {review.length} 개 </th>
                  <th></th>
                  <th>평점 : {averageScore()}점</th>
                </tr>
                {review.map((item, i) => {
                  return (
                    <tr key={i}>
                      <td>{item.content}</td>
                      <td>
                        {item.writer.substring(0, 1) +
                          "*" +
                          item.writer.substring(2)}
                      </td>
                      <td>{scoreToStar(item.score)}</td>
                    </tr>
                  );
                })}
              </ScoreTable>
            </Wrapper>
          </div>
        </Form>
      )}
      <Form>
        <div className={styles.ButtonDiv} style={{ marginBottom: "100px" }}>
          <Button onClick={onChange} size="large">
            {view ? "수정하기" : "저장하기"}
          </Button>
        </div>
      </Form>
    </>
  );
};

export default Profile;

const InputForm = styled.div`
  display: flex;
  min-width: 15rem;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  gap: 0.8rem;
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
  .profile-btn {
    position: fixed;
    bottom: 20rem;
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

const ScoreTable = styled.table`
  font-size: 1.1rem;
  width: 50rem;
  border-collapse: collapse;
  margin: 20px 0;
  td {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    min-height: 2rem;
    padding: 10px 0;
  }
  th {
    text-align: start;
  }
  td:nth-child(1) {
    width: 60%;
  }
  td:nth-child(2) {
    width: 20%;
    text-align: center;
  }
  td:nth-child(3),
  th:nth-child(3) {
    width: 20%;
    text-align: center;
  }
`;
