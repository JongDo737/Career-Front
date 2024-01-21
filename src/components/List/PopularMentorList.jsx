import MentorList from "./MentorList";
import Button from "../Button/Button";
import styled from "styled-components";
import { MenteeHeader } from "../../styles/common/Mentee";
import { PopularMentors } from "../../settings/config";
import { useNavigate } from "react-router-dom";

const PopularMentorList = () => {
  const navigate = useNavigate();
  return (
    <StyledContainer>
      <MenteeHeader>이번주 인기 멘토</MenteeHeader>
      <div className="notice">* 멘토 프로필 클릭시 상세보기</div>
      <MentorList mentors={PopularMentors} />
      <div className="button-wrapper">
        <Button onClick={() => navigate("/mentee/mentor/popular")}>
          인기멘토 더 보러가기
        </Button>
      </div>
    </StyledContainer>
  );
};

export default PopularMentorList;

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
