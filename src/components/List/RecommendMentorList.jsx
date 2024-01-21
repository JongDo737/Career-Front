import MentorList from "./MentorList";
import Button from "../Button/Button";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";

const RecommendMentorList = () => {
  const todayMentors = [
    {
      name: "김성애",
      age: 20,
      school: "한양대 컴퓨터소프트웨어학부",
      state: "졸업 (2023)",
      tags: ["정확한 코칭", "친절한"],
      image:
        "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    },
    {
      name: "신종민",
      age: 21,
      school: "OO대 OO학부",
      state: "재학중 (3학년)",
      tags: ["즐거운", "실력있는"],
      image:
        "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
    },
    {
      name: "한재준",
      age: 22,
      school: "OO대 OO학부",
      state: "졸업 예정 (2024)",
      tags: ["경험 많은", "유쾌한"],
      image:
        "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
    },
    {
      name: "채희문",
      age: 23,
      school: "OO대 OO학부",
      state: "졸업 예정 (2024)",
      tags: ["지식이 풍부한", "센스있는"],
      image: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
    },
  ];
  return (
    <StyledContainer>
      <header className="header">오늘은 이 분이다! 맞춤형 멘토</header>
      <div className="notice">* 멘토 프로필 클릭시 상세보기</div>
      <MentorList mentors={todayMentors} />
      <div className="button-wrapper">
        <Button>추천멘토 더 보러가기</Button>
      </div>
    </StyledContainer>
  );
};

export default RecommendMentorList;

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .header {
    margin: 3rem;
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.primaryBlue};
  }
  .notice {
    width: 100%;
    text-align: end;
    font-size: 1.1rem;
    color: #334b6c;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  .button-wrapper {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }
`;
