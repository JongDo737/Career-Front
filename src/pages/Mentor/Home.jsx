import React, { useState } from "react";
import styled from "styled-components";
import PointBox from "../../components/Box/PointBox";
import MoveBox from "../../components/Box/MoveBox";
import { ButtonDiv } from "../../components/Button/Button";
import ConsultList from "../../components/List/ConsultList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "../../components/Line/HorizontalLine";
import useGetConsult from "../../hooks/useGetConsult";
import { useNavigate } from "react-router-dom";
import useGetCancelConsult from "../../hooks/useGetCancelConsult";
import useGetCompletedConsult from "../../hooks/useGetCompletedConsult";
import {
  CANCEL_CONSULT_TYPE,
  COMPLETED_CONSULT_TYPE,
  UPCOMING_CONSULT_TYPE,
} from "../../constants";

const Home = () => {
  const [userName, setUserName] = useState("김성애");
  // const [consultList, setConsultList] = useState([
  //   {
  //     id: 0,
  //     name: "김성애",
  //     startTime: new Date(2023, 3, 25, 13, 30, 0),
  //     endTime: new Date(2023, 3, 25, 13, 50, 0),
  //     consultMajor: "컴퓨터소프트웨어학부",
  //     request: "어떤 공부를 해야할지 궁금해요.",
  //   },
  //   {
  //     id: 1,
  //     name: "신종민",
  //     startTime: new Date(2023, 4, 21, 13, 30, 0),
  //     endTime: new Date(2023, 4, 21, 13, 30, 0),
  //     consultMajor: "전산학부",
  //     request: "어떤 공부를 해야할지 궁금해요.",
  //   },
  //   {
  //     id: 2,
  //     name: "한재준",
  //     startTime: new Date(2023, 5, 3, 13, 30, 0),
  //     endTime: new Date(2023, 5, 3, 13, 30, 0),
  //     consultMajor: "컴퓨터소프트웨어학부",
  //     request: "어떤 공부를 해야할지 궁금해요.",
  //   },
  //   {
  //     id: 3,
  //     name: "채희문",
  //     startTime: new Date(2023, 5, 3, 13, 30, 0),
  //     endTime: new Date(2023, 5, 3, 13, 30, 0),
  //     consultMajor: "화학공학과",
  //     request: "잘할 수 있을까요?",
  //   },
  // ]);
  const { lastUpcomingConsult, upcomingConsult } = useGetConsult();
  const { cancelConsult } = useGetCancelConsult();
  const { completedConsult } = useGetCompletedConsult();
  const navigate = useNavigate();
  return (
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
          <div onClick={() => navigate(`/schedule`)}>
            <FontAwesomeIcon icon={faCalendar} />
            <span>시간표 확인하기</span>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </MoveBox>
      </FormLeft>
      {/* <VerticalLine /> */}
      <FormRight>
        <Wrapper>
          <header>곧 진행될 상담</header>
          {!lastUpcomingConsult.length ? (
            <Consult>
              <span>진행될 상담이 없습니다.</span>
              <div
                className="button-wrapper"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <ButtonDiv onClick={() => navigate(`/schedule`)}>
                  시간표 바로가기
                </ButtonDiv>
              </div>
            </Consult>
          ) : (
            <Consult>
              <ConsultList
                consultList={[lastUpcomingConsult[0]]}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>진행 예정된 상담 ({upcomingConsult.length})</header>
          {!upcomingConsult.length ? (
            <Consult>
              <span>진행될 상담이 없습니다.</span>
            </Consult>
          ) : (
            <Consult>
              <ConsultList
                consultList={upcomingConsult}
                type={UPCOMING_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>완료된 상담 ({completedConsult.length})</header>
          {!completedConsult.length ? (
            <Consult>
              <span>완료된 상담이 없습니다.</span>
            </Consult>
          ) : (
            <Consult>
              <ConsultList
                consultList={completedConsult}
                color="#D9D9D9"
                type={COMPLETED_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>취소한 상담 ({cancelConsult.length})</header>
          {!cancelConsult.length ? (
            <Consult>
              <span>취소한 상담이 없습니다.</span>
            </Consult>
          ) : (
            <Consult>
              <ConsultList
                consultList={cancelConsult}
                color="#D9D9D9"
                type={CANCEL_CONSULT_TYPE}
              />
            </Consult>
          )}
        </Wrapper>
      </FormRight>
    </Form>
  );
};

export default Home;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 20rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
`;

const FormRight = styled.div`
  min-width: 70vh;
  max-width: 90rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6rem;
  border-left: 1px solid #bcbcbc;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  > header {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const Consult = styled.div`
  width: 100%;
  min-height: 20rem;
  height: 200px;
  max-height: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.3rem;
  color: #909090;
  position: relative;
  margin-top: 2rem;
  overflow: auto hidden;
  > span {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }
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
