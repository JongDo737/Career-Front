import MentorList from "./MentorList";
import Button from "../Button/Button";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { useNavigate } from "react-router-dom";
import { MenteeHeader } from "../../styles/common/Mentee";
import { RecommendMentors } from "../../settings/config";

const RecommendMentorList = () => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <MenteeHeader>나의 맞춤형 멘토</MenteeHeader>
      <div className="notice">* 멘토 프로필 클릭시 상세보기</div>
      <MentorList mentors={RecommendMentors} />
      <div className="button-wrapper">
        <Button
          onClick={() => {
            navigate("/mentee/mentor/recommend");
          }}
        >
          추천멘토 더 보러가기
        </Button>
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
