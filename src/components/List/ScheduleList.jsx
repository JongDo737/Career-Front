import React, { useEffect, useState } from "react";
import { dateParse } from "../../utils/dateParse";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
const ScheduleList = () => {
  const upcomingConsult = [
    {
      id: 0,
      profileImg: "https://img.hankyung.com/photo/202005/01.22637888.1.jpg",
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
      content: `공부 진짜 하기 싫은데 해야죠.. 근데 공부법을 잘 모르겠어요. 선생님은 어떻게 공부하셨어요?`,
    },
    {
      id: 1,
      profileImg: "",
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
      content: `공부 진짜 하기 싫은데 해야죠.. 근데 공부법을 잘 모르겠어요. 선생님은 어떻게 공부하셨어요?`,
    },
    {
      id: 2,
      profileImg: "https://img.hankyung.com/photo/202005/01.22637888.1.jpg",
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
      content: `공부 진짜 하기 싫은데 해야죠.. 근데 공부법을 잘 모르겠어요. 선생님은 어떻게 공부하셨어요?`,
    },
  ];

  const pendingConsult = [
    {
      id: 0,
      profileImg: "",
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
      content: `공부 진짜 하기 싫은데 해야죠.. 근데 공부법을 잘 모르겠어요. 선생님은 어떻게 공부하셨어요?`,
    },
    {
      id: 1,
      profileImg: "https://img.hankyung.com/photo/202005/01.22637888.1.jpg",
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
      content: `공부 진짜 하기 싫은데 해야죠.. 근데 공부법을 잘 모르겠어요. 선생님은 어떻게 공부하셨어요?`,
    },
    {
      id: 2,
      profileImg: "",
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
      content: `공부 진짜 하기 싫은데 해야죠.. 근데 공부법을 잘 모르겠어요. 선생님은 어떻게 공부하셨어요?`,
    },
  ];
  const [upcomingDetailId, setUpcomingDetailId] = useState("");
  const [pendingDetailId, setPendingDetailId] = useState("");
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailObject, setDetailObject] = useState({});

  useEffect(() => {
    if (isDetailOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [isDetailOpen]);
  return (
    <>
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
                    <span className="item__content">
                      {upcoming.consultType}
                    </span>
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
                  <button
                    className="detail-btn"
                    onClick={() => {
                      setDetailObject({ ...upcoming });
                      setIsDetailOpen(true);
                    }}
                  >
                    자세히 보기
                  </button>
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
                  <button
                    className="detail-btn"
                    onClick={() => {
                      setDetailObject({ ...pending });
                      setIsDetailOpen(true);
                    }}
                  >
                    자세히 보기
                  </button>
                </div>
              )}
            </>
          ))}
        </List>
      </ListWrapper>
      {isDetailOpen && (
        <ModalWrapper onClick={() => setIsDetailOpen(false)}>
          <DetailModal onClick={(e) => e.stopPropagation()}>
            <header className="detail-header">
              <div
                className="detail-header__img"
                img={detailObject.profileImg}
              ></div>
              <span className="detail-header__name">
                {detailObject.nickname}
              </span>
              <div className="detail-header__date">
                상담 예정 시간 : {dateParse(detailObject.date)}{" "}
                {detailObject.startTime} ~ {detailObject.endTime}
              </div>
              <FontAwesomeIcon
                icon={faXmark}
                className="icon"
                onClick={() => setIsDetailOpen(false)}
              />
            </header>
            <main>
              <div className="detail-main detail-consult">
                <div className="detail-main__title">상담 내용</div>
                <div className="detail-consult-content">
                  {detailObject.content}
                </div>
              </div>
              <div className="detail-main detail-question">
                <div className="detail-main__title">사전 질문</div>
                {detailObject.questions.map((question, questionIdx) => (
                  <div className="detail-question-content" key={question.id}>
                    {questionIdx + 1}. {question}
                  </div>
                ))}
              </div>
            </main>
          </DetailModal>
        </ModalWrapper>
      )}
    </>
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
    .detail-btn {
      width: 10rem;
      height: 2rem;
      margin: 1rem auto 0;
      background-color: transparent;
      border: 1px solid gray;
      border-radius: 5px;
      cursor: pointer;
      &:hover {
        background-color: #334b6c;
        color: white;
      }
    }
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8080806d;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;
const DetailModal = styled.div`
  width: 55rem;
  height: 10rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  .detail-header {
    display: flex;
    align-items: center;
    gap: 2rem;
    position: relative;
    padding-top: 1.5rem;
    .icon {
      font-size: 2rem;
      cursor: pointer;
      position: absolute;
      top: 0rem;
      right: 0rem;
      color: #515151;
    }
    &__img {
      width: 5rem;
      height: 5rem;
      background-image: ${(props) =>
        props.img
          ? `url(${props.img})`
          : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
      background-size: cover;
      border: 1px solid gray;
      border-radius: 50%;
    }
    &__name {
      font-size: 2rem;
      font-weight: 500;
    }
    &__date {
      /* position: absolute;
      top: 0rem;
      right: 4rem; */
      font-size: 1.2rem;
      font-weight: 600;
      padding: 0.5rem 1rem;
      background-color: #334b6c;
      color: white;
      border-radius: 0.7rem;
    }
  }
`;
