import React, { useState } from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import PointBox from "../../components/Box/PointBox";
import MoveBox from "../../components/Box/MoveBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleRight,
  faCalendar,
  faTicket,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "../../components/Line/HorizontalLine";
import MentorList from "../../components/List/MentorList";
import { colors } from "../../styles/common/Theme";
import {
  MenteeMentorLinkList,
  MenteeMentorMenu,
  PopularMentors,
  RecommendMentors,
} from "../../settings/config";
import { MenteeHeader } from "../../styles/common/Mentee";
import RecommendMentorList from "../../components/List/RecommendMentorList";
import PopularMentorList from "../../components/List/PopularMentorList";
const Mentor = () => {
  const subMenuList = MenteeMentorMenu;
  const subMenuLinkList = MenteeMentorLinkList;
  const subMenu = subMenuList[0];
  const [userName, setUserName] = useState("김성애");
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[0]}
        subMenuLinkList={subMenuLinkList}
      />
      <Form>
        <FormLeft>
          <Wrapper>
            <NameDiv>
              <span>{userName}</span>님 반갑습니다!
            </NameDiv>
          </Wrapper>
          <PointBox point="10,000" />
          <MoveBox>
            <div>
              <FontAwesomeIcon icon={faUser} />
              <span>친구 초대하기</span>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </MoveBox>
          <MoveBox>
            <div>
              <FontAwesomeIcon icon={faCalendar} />
              <span>상담 예약하기</span>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </MoveBox>
          <MoveBox>
            <div>
              <FontAwesomeIcon icon={faTicket} />
              <span>이용권 구매하기</span>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </MoveBox>
        </FormLeft>

        <FormRight>
          {subMenu === subMenuList[0] ? (
            <>
              <Wrapper>
                <PopularMentorList />
              </Wrapper>
              <LineGap>
                <HorizontalLine />
              </LineGap>

              <Wrapper>
                <RecommendMentorList />
              </Wrapper>
            </>
          ) : (
            ""
          )}
        </FormRight>
      </Form>
    </>
  );
};

export default Mentor;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 20rem;
  height: 73vh;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
`;

const FormRight = styled.div`
  width: 60rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6rem;
  border-left: 1px solid #bcbcbc;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const NameDiv = styled.div`
  font-size: 1.7rem;
  font-weight: 500;
  width: 100%;
  span {
    font-size: 2rem;
    font-weight: 600;
    color: #334b6c;
    padding-right: 1rem;
  }
`;

const Header = styled.div`
  border: 1px solid black;
  width: 8rem;
  padding: 0.5rem 2rem;
  background-color: #334b6c;
  color: white;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 1.2rem;
  font-weight: 500;
`;

const SortList = styled.div`
  div {
    border: 2px solid black;
    padding: 0.5rem 1rem;
    text-align: center;
    border-radius: 5px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    &:hover {
      background-color: ${colors.primaryBlue};
      color: white;
    }
  }
  margin: 1rem 0;
  display: flex;
  gap: 1rem;
`;
const LineGap = styled.div`
  width: 100%;
  margin: 4rem 0;
`;
