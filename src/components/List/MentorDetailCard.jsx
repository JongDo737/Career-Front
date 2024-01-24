import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/Theme";
import { dateTimeParse } from "../../utils/ParseFormat";

const MentorDetailCard = ({ mentor }) => {
  const { image, name, age, school, state, tags } = mentor;
  const [IsDetailOpen, setIsDetailOpen] = useState(false);
  const item = {
    startTime: new Date().toISOString(),
    endTime: new Date("2024-01-24").toISOString(),
    major: "화학공학과",
    questions: "전망이 좋나요?\n 공부를 어떻게 하면 좋을지 모르겠어요.",
  };
  return (
    <StyledContainer>
      <ProfileWrapper>
        <img alt="" src={image} />
        <div className="content">
          <header>
            {name} ({age})
          </header>
          <main>
            <span>{school}</span>
            <span>{state}</span>
          </main>
          <footer>
            {tags.map((tag, idx) => {
              return <span key={idx}>#{tag}</span>;
            })}
          </footer>
        </div>
      </ProfileWrapper>
      <InfoWrapper>
        <div className="main">
          <div className="main-content time">
            <div>상담 시작 : </div>
            <div> {dateTimeParse(item.startTime)}</div>
          </div>
          <div className="main-content time">
            <div>상담 종료 : </div>
            <div> {dateTimeParse(item.endTime)}</div>
          </div>
          <div className="main-content major">
            <div>상담할 전공 : </div>
            <div className="majorName">{item.major}</div>
          </div>
          <div className="main-content question">
            <div>주요 질문 :</div>
            <span className="full-name">{item.questions}</span>
            <div>{item.questions || "질문이 없습니다"}</div>
          </div>
        </div>
        <div className="footer">
          <div className="button" onClick={() => setIsDetailOpen(true)}>
            자세히 보기
          </div>
        </div>
      </InfoWrapper>
    </StyledContainer>
  );
};

export default MentorDetailCard;

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 15rem 25rem;
  grid-template-rows: 25rem;
  box-shadow: 1px 1px 10px ${colors.primaryBlue};
  border: 1px solid black;
  border-radius: 10px;
`;
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2rem;
    background-color: #00000061;
    padding: 10px;
    border-radius: 50%;
  }
  img {
    width: 100%;
    height: 15rem;
    object-fit: cover;
    border-top-left-radius: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 10px;
    text-align: center;
    font-size: 1.1rem;
    height: 11rem;
    background-color: #f5f5f5;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    font-weight: 500;
    header {
      font-size: 1.3rem;
    }
    main {
      display: flex;
      flex-direction: column;
    }
    footer {
      display: flex;
      gap: 10px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: center;
    }
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3rem 2rem 2rem;
  justify-content: space-between;
  background-color: #f6f5f5;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-left: 1px solid ${colors.primaryBlue};
  cursor: default;
  .main {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    font-size: 1.2rem;
    .main-content {
      display: flex;
      align-items: center;
      height: 2rem;
      div:first-child {
        text-align: start;
        margin-right: 10px;
        white-space: nowrap;
      }
      div:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .majorName {
        background-color: ${(props) =>
          props.color === "#D9D9D9"
            ? "#9D9D9D"
            : "" || `${colors.primaryBlue}`};
        color: white;
        padding: 0.7rem;
        border-radius: 10px;
      }
    }
    .question {
      position: relative;
      &:hover {
        .full-name {
          visibility: visible;
        }
      }
    }
    .full-name {
      /* visibility: hidden; */
      position: absolute;
      bottom: 1.6rem;
      left: 5rem;
      color: black;
      background-color: #d5d5d5;
      visibility: hidden;
      padding: 0.2rem 0.5rem;
      border-radius: 10px;
      font-size: 0.8rem;
      text-align: center;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    .button {
      border: 1px solid ${colors.primaryBlue};
      padding: 0.7rem 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: ${(props) =>
          props.color === "#D9D9D9"
            ? "#9D9D9D"
            : "" || `${colors.primaryBlue}`};
        color: white;
      }
    }
  }
`;
