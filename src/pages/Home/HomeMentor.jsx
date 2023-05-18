import React, { useState } from "react";
import styled from "styled-components";
import VerticalLine from "../../components/Line/VerticalLine";
import styles from "./HomeMentor.module.scss";
import PointBox from "../../components/Box/PointBox";
import MoveBox from "../../components/Box/MoveBox";
import Button from "../../components/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faAngleRight,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "../../components/Line/HorizontalLine";
const HomeMentor = () => {
  const [userName, setUserName] = useState("김성애");
  const [consultCount, setConsultCount] = useState(0);
  return (
    <Form>
      <Form30>
        <Wrapper>
          <div className={styles.NameDiv}>
            <span>{userName}</span>님 반갑습니다!
          </div>
        </Wrapper>
        <PointBox point="10000" />
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
            <span>시간표 확인하기</span>
          </div>
          <FontAwesomeIcon icon={faAngleRight} />
        </MoveBox>
      </Form30>
      <VerticalLine height={"100vh"} />
      <Form70>
        <Wrapper>
          <header>곧 진행될 상담</header>
          {true ? (
            <>
              <NoConsult>
                <span>진행될 상담이 없습니다.</span>
                <Button>시간표 바로가기</Button>
              </NoConsult>
            </>
          ) : (
            ""
          )}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>진행 예정된 상담 ({consultCount})</header>
          {!consultCount ? <NoConsult>진행될 상담이 없습니다.</NoConsult> : ""}
        </Wrapper>
        <HorizontalLine />
        <Wrapper>
          <header>완료된 상담 ({consultCount})</header>
          {!consultCount ? <NoConsult>왼료된 상담이 없습니다.</NoConsult> : ""}
        </Wrapper>
      </Form70>
    </Form>
  );
};

export default HomeMentor;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const Form30 = styled.div`
  width: 23rem;
  height: 80vh;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
`;

const Form70 = styled.div`
  width: 70rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin: 20px 0;
  header {
    margin-top: 2rem;
    font-size: 1.5rem;
    font-weight: 600;
  }
`;

const NoConsult = styled.div`
  width: 100%;
  min-height: 20rem;
  height: 25vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: #909090;
  span {
    margin-bottom: 10px;
  }
`;
