import React, { useEffect, useState } from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import RecommendMenteeItem from "../../components/List/RecommendMenteeItem";
import ConsultList from "../../components/List/ConsultList";
import { ConsultListShort } from "../../components/List/ConsultList";
import HorizontalLine from "../../components/Line/HorizontalLine";
import useGetConsult from "../../hooks/useGetConsult";

const Consult = () => {
  const subMenuList = ["전체보기", "예정된 상담", "완료된 상담"];
  const { lastUpcomingConsult, upcomingConsult, previousConsult } =
    useGetConsult();

  console.log("data ", upcomingConsult, previousConsult);
  const [subMenu, setSubMenu] = useState(subMenuList[0]);

  const [recommend, setRecomment] = useState([
    {
      title: "전산학부 고민입니다..",
      name: "김성애",
      grade: "고등학교 2학년",
      date: "2023-06-06",
      interest: "전자공학과, 컴퓨터공학과",
    },
    {
      title: "전산학부 고민입니다..",
      name: "김성애",
      grade: "고등학교 2학년",
      date: "2023-06-06",
      interest: "전자공학과, 컴퓨터공학과",
    },
    {
      title: "전산학부 고민입니다..",
      name: "김성애",
      grade: "고등학교 2학년",
      date: "2023-06-06",
      interest: "전자공학과, 컴퓨터공학과",
    },
    {
      title: "전산학부 고민입니다..",
      name: "김성애",
      grade: "고등학교 2학년",
      date: "2023-06-06",
      interest: "전자공학과, 컴퓨터공학과",
    },
  ]);
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
  // const [consultCount, setConsultCount] = useState(consultList.length);

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenu}
        setSubMenu={setSubMenu}
      />
      <Form>
        <FormLeft>
          <Wrapper>
            <header>추천 학생</header>
            <RecommendWrapper>
              <RecommendMenteeItem recommendList={recommend} />
            </RecommendWrapper>
          </Wrapper>
        </FormLeft>

        {subMenu === subMenuList[0] ? (
          <FormRight>
            <Wrapper>
              <header>진행 예정된 상담 ({upcomingConsult.length})</header>
              {!upcomingConsult.length ? (
                <ConsultWrapper>
                  <span>진행될 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList consultList={upcomingConsult} />
                </ConsultWrapper>
              )}
            </Wrapper>
            <HorizontalLine />
            <Wrapper>
              <header>완료된 상담 ({previousConsult.length})</header>
              {!previousConsult.length ? (
                <ConsultWrapper>
                  <span>완료된 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList consultList={previousConsult} color="#D9D9D9" />
                </ConsultWrapper>
              )}
            </Wrapper>
          </FormRight>
        ) : (
          ""
        )}
        {subMenu === subMenuList[1] ? (
          <FormRight>
            <Wrapper>
              <header>진행 예정된 상담 ({upcomingConsult.length})</header>
              {!upcomingConsult.length ? (
                <ConsultWrapper>
                  <span>진행될 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList consultList={upcomingConsult} />
                </ConsultWrapper>
              )}
            </Wrapper>
            <HorizontalLine />
            <Wrapper>
              <ConsultListShort consultList={upcomingConsult} />
            </Wrapper>
          </FormRight>
        ) : (
          ""
        )}
        {subMenu === subMenuList[2] ? (
          <FormRight>
            <Wrapper>
              <header>완료된 상담 ({previousConsult.length})</header>
              {!previousConsult.length ? (
                <ConsultWrapper>
                  <span>완료된 상담이 없습니다.</span>
                </ConsultWrapper>
              ) : (
                <ConsultWrapper>
                  <ConsultList
                    consultList={previousConsult}
                    color="#D9D9D9" // 나중에 state 로 바꾸는 게 어떨까..
                  />
                </ConsultWrapper>
              )}
            </Wrapper>
            <HorizontalLine />
            <Wrapper>
              <ConsultListShort consultList={previousConsult} color="#D9D9D9" />
            </Wrapper>
          </FormRight>
        ) : (
          ""
        )}
      </Form>
    </>
  );
};

export default Consult;

const Form = styled.div`
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 20rem;
  min-height: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 5rem;
  height: 73vh;
`;

const FormRight = styled.div`
  min-width: 50rem;
  max-width: 90rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 6rem;
  border-left: 1px solid #bcbcbc;
  gap: 4rem;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  height: 100%;

  > header {
    margin-top: 2rem;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const RecommendWrapper = styled.div`
  height: 100%;
  overflow: auto;
`;

const ConsultWrapper = styled.div`
  width: 100%;
  min-height: 20rem;
  height: 26vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  font-size: 1.3rem;
  color: #909090;
  position: relative;
  margin-top: 2rem;
  overflow: auto hidden;
  span {
    margin-bottom: 10px;
    text-align: center;
    width: 100%;
  }
`;
