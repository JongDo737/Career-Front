import React, { useEffect, useState } from "react";
import SubMenubar from "../../../components/Menubar/SubMenubar";
import styled from "styled-components";
import RecommendMenteeItem from "../../../components/List/RecommendMenteeItem";
import ConsultList from "../../../components/List/ConsultList";
import { ConsultListShort } from "../../../components/List/ConsultList";
import HorizontalLine from "../../../components/Line/HorizontalLine";
import useGetConsult from "../../../hooks/useGetConsult";

const UpcomingConsult = () => {
  const subMenuList = ["전체보기", "예정된 상담", "완료된 상담"];
  const subMenuLink = [
    "/mentor/consult",
    "/mentor/consult/upcoming",
    "/mentor/consult/previous",
  ];
  const { lastUpcomingConsult, upcomingConsult, previousConsult } =
    useGetConsult();
  const [subMenu, setSubMenu] = useState("예정된 상담");

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
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenu}
        // setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLink}
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
      </Form>
    </>
  );
};

export default UpcomingConsult;

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
