import React, { useState } from "react";
import { dateParse } from "../../utils/dateParse";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
const ScheduleList = () => {
  const upcomingConsult = [
    {
      id: 0,
      nickname: "ASDF",
      date: "2023-10-26",
      startTime: "13:00",
      endTime: "14:30",
      major: "전산학부",
      consultType: "비대면",
      questions: [
        "front 를 할지, back 을 할지 고민중이에요.",
        "성적과 비교과 어느 것이 중요한가요?",
      ],
    },
    {
      id: 1,
      nickname: "왕만두",
      date: "2023-10-27",
      startTime: "11:00",
      endTime: "12:00",
      major: "컴퓨터공학부",
      consultType: "비대면",
      questions: [
        "front 를 할지, back 을 할지 고민중이에요.",
        "성적과 비교과 어느 것이 중요한가요?",
      ],
    },
    {
      id: 2,
      nickname: "한국사짱좋아한국사짱좋아",
      date: "2023-10-27",
      startTime: "15:00",
      endTime: "16:00",
      major: "기계공학부",
      consultType: "비대면",
      questions: [
        "front 를 할지, back 을 할지 고민중이에요.",
        "성적과 비교과 어느 것이 중요한가요?",
      ],
    },
  ];

  const pendingConsult = [
    {
      id: 0,
      nickname: "ASDF",
      date: "2023-10-26",
      startTime: "13:00",
      endTime: "14:30",
      major: "전산학부",
      consultType: "비대면",
      questions: [
        "front 를 할지, back 을 할지 고민중이에요.",
        "성적과 비교과 어느 것이 중요한가요?",
      ],
    },
    {
      id: 1,
      nickname: "왕만두",
      date: "2023-10-27",
      startTime: "11:00",
      endTime: "12:00",
      major: "컴퓨터공학부",
      consultType: "비대면",
      questions: [
        "front 를 할지, back 을 할지 고민중이에요.",
        "성적과 비교과 어느 것이 중요한가요?",
      ],
    },
    {
      id: 2,
      nickname: "한국사짱좋아한국사짱좋아",
      date: "2023-10-27",
      startTime: "15:00",
      endTime: "16:00",
      major: "기계공학부",
      consultType: "비대면",
      questions: [
        "front 를 할지, back 을 할지 고민중이에요.",
        "성적과 비교과 어느 것이 중요한가요?",
      ],
    },
  ];
  const [upcomingDetailId, setUpcomingDetailId] = useState("");
  const [pendingDetailId, setPendingDetailId] = useState("");

  return (
    <ListWrapper>
      <List>
        <h1 className="list-title">예정된 상담 ({upcomingConsult.length})</h1>
        <ul className="header">
          <li>No</li>
          <li>닉네임</li>
          <li>날짜</li>
          <li>시간</li>
          <li></li>
        </ul>
        {upcomingConsult.map((upcoming, upcomingIdx) => (
          <>
            <ul className="main" key={upcoming.id}>
              <li>{upcomingIdx}</li>
              <li>{upcoming.nickname}</li>
              <li>{dateParse(upcoming.date)}</li>
              <li>
                {upcoming.startTime} ~ {upcoming.endTime}
              </li>
              <li>
                {upcomingDetailId === upcomingIdx ? (
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className="icon"
                    onClick={() => {
                      setUpcomingDetailId("");
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="icon"
                    onClick={() => {
                      setUpcomingDetailId(upcomingIdx);
                    }}
                  />
                )}
              </li>
            </ul>
            {upcomingIdx === upcomingDetailId && (
              <div className="main-detail">
                <div className="main-detail__item">
                  <span className="item__title">- 상담할 전공 : </span>
                  <span className="item__content">{upcoming.major}</span>
                </div>
                <div className="main-detail__item">
                  <span className="item__title">- 상담 방식 : </span>
                  <span className="item__content">{upcoming.consultType}</span>
                </div>
                <div className="main-detail__item">
                  <span className="item__title">- 주요 질문 : </span>
                  <div className="question-wrapper">
                    {upcoming.questions.map((question, qIdx) => (
                      <span key={qIdx} className="item__content">
                        {question}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </List>
      <List>
        <h1 className="list-title">
          수락 대기중인 상담 ({pendingConsult.length})
        </h1>
        <ul className="header">
          <li>No</li>
          <li>닉네임</li>
          <li>날짜</li>
          <li>시간</li>
          <li></li>
        </ul>
        {pendingConsult.map((pending, pendingIdx) => (
          <>
            <ul className="main" key={pending.id}>
              <li>{pendingIdx}</li>
              <li>{pending.nickname}</li>
              <li>{dateParse(pending.date)}</li>
              <li>
                {pending.startTime} ~ {pending.endTime}
              </li>
              <li>
                {pendingDetailId === pendingIdx ? (
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className="icon"
                    onClick={() => {
                      setPendingDetailId("");
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="icon"
                    onClick={() => {
                      setPendingDetailId(pendingIdx);
                    }}
                  />
                )}
              </li>
            </ul>
            {pendingIdx === pendingDetailId && (
              <div className="main-detail">
                <div className="main-detail__item">
                  <span className="item__title">- 상담할 전공 : </span>
                  <span className="item__content">{pending.major}</span>
                </div>
                <div className="main-detail__item">
                  <span className="item__title">- 상담 방식 : </span>
                  <span className="item__content">{pending.consultType}</span>
                </div>
                <div className="main-detail__item">
                  <span className="item__title">- 주요 질문 : </span>
                  <div className="question-wrapper">
                    {pending.questions.map((question, qIdx) => (
                      <span key={qIdx} className="item__content">
                        {question}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </List>
    </ListWrapper>
  );
};

export default ScheduleList;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;
const List = styled.div`
  width: 30rem;
  max-width: 40vw;
  font-size: 1rem;
  .list-title {
    font-size: 1.3rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }
  > .header,
  .main {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: #516684;
    color: white;
    gap: 0.5rem;
    li {
      flex: 2;
      text-align: center;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &:first-child,
      &:last-child {
        flex: 0.5;
      }
      > .icon {
        font-size: 1rem;
        cursor: pointer;
      }
    }
  }
  > .main {
    background-color: white;
    color: black;
    border: 1px solid lightgray;
    border-top: none;
  }
  .main-detail {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 0.7rem;
    border: 1px solid lightgray;
    border-top: none;
    &__item {
      display: flex;
      width: 100%;
      .item__title {
        width: 25%;
        padding-left: 1rem;
      }
      .item__content {
        font-weight: 700;
        color: #334b6c;
      }
      .question-wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
      }
    }
  }
`;
