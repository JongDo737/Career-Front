import { useState, useRef, useEffect } from "react";
import Button from "../../components/Button/Button";
import MenuLine from "../../components/Line/MenuLine";
import HorizontalLine from "../../components/Line/HorizontalLine";
import Input from "../../components/Input/Input";
import "react-datepicker/dist/react-datepicker.css";
import SchoolList from "../../components/List/SchoolList";
import CareerList from "../../components/List/CareerList";
import Image from "../../components/Image/Image";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  Form50,
  FormHalf,
  Title,
  Form,
  Wrapper,
  Label,
  InputForm,
  Radio,
  FileUpload,
  FileList,
  FileItem,
  FileUploadBtn,
  ValidWrapper,
} from "../../styles/common/FoamComponents";
import TitleWithBar from "../../components/Input/InputWithTitle";
import ReviewList from "../../components/List/ReviewList";
import { ScrollUp } from "../../components/Scroll";
import TagList from "../../components/List/TagList";
import { fetchMentorProfile } from "../../api/fetchProfile";
import { useQuery } from "react-query";
import {
  birthHypenParse,
  birthOnlyNumberParse,
  jsonParse,
  phoneNumberParse,
} from "../../utils/ParseFormat";
import { checkValidNickname } from "../../api/checkValid";
import { CompareObjects } from "../../utils/CompareObjects";
import { modifyMentorProfile } from "../../api/modifyProfile";

const MentorProfile = (props) => {
  const [numberCode, setNumberCode] = useState("");
  const [consult, setConsult] = useState({
    first: "컴퓨터공학과",
    second: "전자공학과",
    third: "화학공학과",
  });
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
      schoolName: "고려대학교",
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
  const { data, isLoading, refetch } = useQuery(
    ["profile", { view }],
    fetchMentorProfile,
    {
      // enabled: view,
      onSuccess: (data) => {
        setUser({ ...data, birth: birthHypenParse(data.birth) });
      },
    }
  );
  const [validNickname, setValidNickname] = useState(false);

  const tag = [
    { id: 0, name: "머신러닝" },
    { id: 1, name: "앱개발" },
    { id: 2, name: "안드로이드" },
    { id: 3, name: "알고리즘" },
  ];
  const fileInput = useRef(null);

  //서버에서 받아오는 데이터
  const [user, setUser] = useState({
    // name: "",
    // username: "",
    // nickname: "",
    // password: "",
    // telephone: "",
    // gender: null,
    // introduce: "",
    // plan: "",
    // hobby: "",
    // schoolList: [],
    // careerList: [],
    // consultMajor1: "",
    // consultMajor2: "",
    // consultMajor3: "",
    // tagList: [],
  });
  const onChangeImg = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
    else return;

    const reader = new FileReader();
    reader.onload = () => {
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

  const onChangeEdit = async (e) => {
    e.preventDefault();
    setView((current) => !current);
    const compareObj = CompareObjects(data, {
      ...user,
      birth: birthOnlyNumberParse(user.birth),
    });
    modifyMentorProfile(compareObj);
    refetch();
    ScrollUp();
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

  //   useEffect(() => {
  //     if (!isLoading) {
  //       setUser({
  //         ...data,
  //         birth: birthParse(data.birth),
  //       });
  //     }
  //   }, []);
  if (isLoading) return <div>loading...</div>;
  return (
    <>
      <Title>
        <MenuLine />
        <span>내 프로필</span>
      </Title>
      <HorizontalLine />
      <Form>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="프로필 사진" />
            <ProfileImg
              src={image}
              alt=""
              onClick={() => {
                fileInput.current.click();
              }}
            />
            {!view && (
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
            )}
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
            <TitleWithBar size="small" title="소개글" />
            <Input
              size="large"
              height="8rem"
              value={user.introduce}
              placeholder="소개글을 작성하세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, introduce: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="커리어 목표" />
            <Input
              size="large"
              height="8rem"
              value={user.plan}
              placeholder="당신의 커리어 목표는 무엇인가요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, plan: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="취미" />
            <Input
              size="large"
              value={user.hobby}
              placeholder="취미를 작성해 주세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, hobby: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
        </FormHalf>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="이름" />
            <Input
              value={user.name}
              placeholder="이름을 입력하세요."
              disabled={true}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="아이디" />
            <Input
              placeholder="아이디를 입력하세요."
              value={user.username}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, username: e.target.value }))
              }
              disabled={true}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="닉네임" />
            <InputForm>
              <Input
                value={user.nickname}
                placeholder={data.nickname}
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, nickname: e.target.value }));
                  setValidNickname(undefined);
                }}
                disabled={view}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setUser((prev) => ({ ...prev, nickname: data.nickname }));
                  }
                }}
              />
              {!view && user.nickname && user.nickname !== data.nickname && (
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
              )}
            </InputForm>
            <ValidWrapper>
              {!view &&
                validNickname === undefined &&
                user.nickname &&
                user.nickname !== data.nickname && (
                  <span>닉네임 중복확인이 필요합니다.</span>
                )}
              {!view &&
                validNickname === false &&
                user.nickname &&
                user.nickname !== data.nickname && (
                  <span>이미 사용중인 닉네임입니다.</span>
                )}
            </ValidWrapper>
          </Wrapper>
          {/* <Wrapper>
            <TitleWithBar size="small" title="비밀번호" />
            <Input
              type="password"
              value={user.password}
              placeholder="비밀번호를 입력하세요."
              onChange={(e) =>
                setUser((prev) => ({ ...prev, password: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          {!view && (
            <Wrapper>
              <TitleWithBar size="small" title="비밀번호 확인" />
              <Input
                type="password"
                value={password}
                placeholder="비밀번호를 다시 입력하세요."
                onChange={(e) => {
                  user.password === e.target.value
                    ? setConfirmPassword(true)
                    : setConfirmPassword(false);
                }}
              />
            </Wrapper>
          )} */}
          <Wrapper>
            <TitleWithBar size="small" title="생년월일" />
            <Input
              type="date"
              value={user.birth}
              onChange={(e) =>
                setUser((prev) => ({ ...prev, birth: e.target.value }))
              }
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="전화번호" />
            <InputForm>
              <Input
                value={user.telephone}
                placeholder={data.telephone}
                onChange={(e) => {
                  const withHypenNumber = phoneNumberParse(e.target.value);
                  setUser((prev) => ({
                    ...prev,
                    telephone: withHypenNumber,
                  }));
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setUser((prev) => ({ ...prev, telephone: data.telephone }));
                  }
                }}
                disabled={view}
              />

              {!view && user.telephone && user.telephone !== data.telephone && (
                <Button height="3rem">인증코드 전송</Button>
              )}
            </InputForm>
            {!view && user.telephone && user.telephone !== data.telephone && (
              <InputForm>
                <Input
                  placeholder="인증코드를 입력하세요."
                  onChange={(e) => setNumberCode(e.target.value)}
                />
                <Button height="3rem">확인</Button>
              </InputForm>
            )}
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="성별" />
            <InputForm>
              <Label style={{ pointerEvents: view ? "none" : "" }}>
                <Radio
                  type="radio"
                  name="gender"
                  value="남자"
                  onChange={() =>
                    setUser((prev) => ({ ...prev, gender: true }))
                  }
                  checked={user.gender}
                  disabled={view}
                />
                <div style={{ color: view ? "gray" : "", fontSize: "1.3rem" }}>
                  남자
                </div>
              </Label>
              <Label style={{ pointerEvents: view ? "none" : "" }}>
                <Radio
                  type="radio"
                  name="gender"
                  value="여자"
                  placeholder="닉네임을 입력하세요."
                  onChange={() =>
                    setUser((prev) => ({ ...prev, gender: false }))
                  }
                  checked={!user.gender}
                  disabled={view}
                />
                <div style={{ color: view ? "gray" : "", fontSize: "1.3rem" }}>
                  여자
                </div>
              </Label>
            </InputForm>
          </Wrapper>
        </FormHalf>
      </Form>
      {/* 여기는 아래 부분 */}
      <Form>
        <Form50>
          <Wrapper>
            <TitleWithBar size="small" title="학력" />
            <SchoolList
              schoolList={schoolList}
              setSchoolList={setSchoolList}
              view={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="경력" />
            <CareerList
              careerList={careerList}
              setCareerList={setCareerList}
              view={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="상담학과1" />
            <Input
              size="large"
              placeholder="첫번째 상담 학과를 입력하세요."
              onChange={(e) => {
                setConsult({ ...consult, first: e.target.value });
              }}
              value={consult.first}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="상담학과2" />
            <Input
              size="large"
              placeholder="두번째 상담 학과를 입력하세요."
              onChange={(e) => {
                setConsult({ ...consult, second: e.target.value });
              }}
              value={consult.second}
              disabled={view}
            />
          </Wrapper>
          <Wrapper>
            <TitleWithBar size="small" title="상담학과3" />
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
            <TitleWithBar size="small" title="학력 증명" />
            <FileUpload>
              {careerFile.length ? (
                <FileList>
                  {careerFile.map((file) => {
                    return (
                      <FileItem>
                        <span>{file.name}</span>
                        <FontAwesomeIcon
                          className="icon"
                          icon={faXmark}
                          onClick={() => onDeleteFile(file.id)}
                        />
                      </FileItem>
                    );
                  })}
                </FileList>
              ) : (
                <FileList
                  style={{
                    color: "gray",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  <span>증명서를 첨부해 주세요.</span>
                  <span>(졸업 증명서, 재학 증명서, ... 택1)</span>
                </FileList>
              )}
              {!view && (
                <FileUploadBtn
                  htmlFor="file"
                  style={{ pointerEvents: view ? "none" : "" }}
                >
                  업로드
                </FileUploadBtn>
              )}
              <input
                multiple
                type="file"
                id="file"
                onChange={onUploadFile}
                style={{ display: "none" }}
                disabled={view}
              />
            </FileUpload>
          </Wrapper>
        </Form50>
      </Form>
      <Form>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="활동 사진" />
            <ImageWrapper>
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
              <Image disabled={view} />
            </ImageWrapper>
          </Wrapper>
        </FormHalf>
        <FormHalf>
          <Wrapper>
            <TitleWithBar size="small" title="태그" />
            <TagList tagList={tag} view={view} />
          </Wrapper>
        </FormHalf>
      </Form>
      {view && (
        <Form>
          <Form50>
            <Wrapper>
              {/* pagination 추가해야함 */}
              <TitleWithBar size="small" title="나에 대한 리뷰" />
              <ReviewList review={review} />
            </Wrapper>
          </Form50>
        </Form>
      )}
      <Form style={{ marginBottom: "8rem" }}>
        <Button onClick={onChangeEdit} size="large" height="3rem">
          {view ? "수정하기" : "저장하기"}
        </Button>
      </Form>
    </>
  );
};

export default MentorProfile;

const ProfileImg = styled.img`
  max-width: 200px;
  max-height: 220px;
  width: 18rem;
  height: 19rem;
  margin-bottom: 10px;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 8rem);
  grid-template-rows: repeat(2, 8rem);
  width: 100%;
  height: 100%;
  gap: 10px;
`;
