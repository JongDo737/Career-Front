import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart as faHeartFull,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import HorizontalLine from "../Line/HorizontalLine";

const CommentItem = () => {
  const [comments, setComments] = useState([
    {
      name: "김성애",
      age: "한양대 졸업", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.09.30", // 파싱 생각해보기
      content:
        "컴퓨터공학과로 진학하고 싶은 분들 있나요? \n어떤 걸 준비해야 하는지 모르거나 막막한 분들은 \n댓글 달아주시거나 상담 신청해주세요~!",
      like: true,
      likeCount: 10,
      message: 4,
      img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
      replyList: [
        {
          name: "신종민",
          age: "부산대 재학", //나중에 나이 숫자로 주면 파싱 생각해보기
          date: "2023.09.30", // 파싱 생각해보기
          content: "오메메메 이런 일이???",
          like: false,
          likeCount: 22,
          message: "",
          img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
          target: "김성애",
        },
        {
          name: "채희문",
          age: "카이스트 졸업", //나중에 나이 숫자로 주면 파싱 생각해보기
          date: "2023.09.30", // 파싱 생각해보기
          content:
            "어떤 걸 준비해야 하는지 모르거나 막막한 분들은 \n댓글 달아주시거나 상담 신청해주세요~!",
          like: false,
          likeCount: 13,
          message: "",
          img: "",
          target: "김성애",
        },
      ],
    },
    {
      name: "홍길동동이",
      age: "서울대 졸업", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.09.30", // 파싱 생각해보기
      content: "아니 나만 힘든 거 아니지?ㅠㅠㅠㅠㅠㅠ",
      like: true,
      likeCount: 11,
      message: 3,
      img: "",
      replyList: [
        {
          name: "한재준",
          age: "카이스트 재학", //나중에 나이 숫자로 주면 파싱 생각해보기
          date: "2023.09.30", // 파싱 생각해보기
          content: "내가 제일 힘들다ㅠㅠㅠ",
          like: false,
          likeCount: 22,
          message: "",
          img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
          target: "홍길동동이",
        },
        {
          name: "김동동애",
          age: "한양대 졸업", //나중에 나이 숫자로 주면 파싱 생각해보기
          date: "2023.09.30", // 파싱 생각해보기
          content: "사장들 안되겠네 ㅋ",
          like: false,
          likeCount: 13,
          message: "",
          img: "",
          target: "한재준",
        },
      ],
    },
  ]);

  const [isAddReply, setIsAddReply] = useState(false);
  const [replyTargetIdx, setReplyTargetIdx] = useState(0);
  const [replyTarget, setReplyTarget] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setreplyInput] = useState("");

  const replyInputRef = useRef(null);
  const replyIRef = useRef(null);
  const scrollToReplyInput = () => {
    if (replyIRef.current) {
      replyIRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const onEnterReply = (commentIdx) => {
    const updatedComments = [...comments];
    updatedComments[commentIdx].replyList.push({
      name: "새로운 아이",
      age: "한국대 재학", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: `${new Date().getFullYear()}.${String(
        new Date().getMonth() + 1
      ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`, // 파싱 생각해보기
      content: replyInput,
      like: false,
      likeCount: 0,
      message: 0,
      img: "",
      target: "",
    });
    setComments(updatedComments);
    setreplyInput("");
    setIsAddReply(false);
  };

  const onEnterComment = () => {
    setComments((prev) => [
      ...prev,
      {
        name: "새로운 아이",
        age: "한국대 재학", //나중에 나이 숫자로 주면 파싱 생각해보기
        date: `${new Date().getFullYear()}.${String(
          new Date().getMonth() + 1
        ).padStart(2, "0")}.${String(new Date().getDate()).padStart(2, "0")}`, // 파싱 생각해보기
        content: commentInput,
        like: false,
        likeCount: 0,
        message: 0,
        img: "",
        replyList: [],
      },
    ]);
    setCommentInput("");
  };
  useEffect(() => {
    if (isAddReply && replyInputRef.current) replyInputRef.current.focus();
  }, [isAddReply]);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [comments]);

  return (
    <>
      {comments.map((comment, commentIdx) => (
        <>
          <Comment img={comment.img} key={commentIdx}>
            <header>
              <div className="header-left">
                <div className="img-container"></div>
                <div className="info">
                  <span className="name">
                    {comment.name} ({comment.age})
                  </span>
                  <span className="date">작성일 {comment.date}</span>
                </div>
              </div>
            </header>
            <main>
              <div className="main-content">{comment.content}</div>
            </main>
            <footer>
              <div className="footer-left">
                {comment.like ? (
                  <FontAwesomeIcon
                    icon={faHeartFull}
                    className="icon heart-full"
                  />
                ) : (
                  <FontAwesomeIcon icon={faHeart} className="icon" />
                )}
                <span>{comment.likeCount}</span>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setIsAddReply(true);
                    setReplyTarget(comment.name);
                    setReplyTargetIdx(commentIdx);
                    scrollToReplyInput();
                  }}
                >
                  답글쓰기
                </span>
              </div>
            </footer>
          </Comment>
          {comment.replyList.map((item, idx) => (
            <>
              <Comment img={item.img} key={idx} style={{ width: "90%" }}>
                <header>
                  <div className="header-left">
                    <div className="img-container"></div>
                    <div className="info">
                      <span className="name">
                        {item.name} ({item.age})
                      </span>
                      <span className="date">작성일 {item.date}</span>
                    </div>
                  </div>
                </header>
                <main>
                  <div className="main-content">
                    {item.target && (
                      <span style={{ color: "#2F5383", fontWeight: "600" }}>
                        @{item.target}
                      </span>
                    )}
                    {item.content}
                  </div>
                </main>
                <footer>
                  <div className="footer-left">
                    {item.like ? (
                      <FontAwesomeIcon
                        icon={faHeartFull}
                        className="icon heart-full"
                      />
                    ) : (
                      <FontAwesomeIcon icon={faHeart} className="icon" />
                    )}
                    <span>{item.likeCount}</span>
                  </div>
                </footer>
              </Comment>

              {/* {isAddReply && !targetIsComment && idx === replyTargetIdx ? (
                <ReplyInput style={{ width: "90%" }}>
                  <input
                    type="text"
                    placeholder={`답글쓰기`}
                    onChange={(e) => setreplyInput(e.target.value)}
                    value={replyInput}
                  />
                  <div className="reply-title">답글쓰기</div>
                  <div className="reply-option">
                    <div
                      className="reply-cancel"
                      onClick={() => setIsAddReply(false)}
                    >
                      취소
                    </div>
                    <div
                      className="reply-enter"
                      onClick={() => {
                        const updatedComments = [...comments];

                        updatedComments[commentIdx].replyList.push({
                          name: "새로운 아이",
                          age: "한국대 재학", //나중에 나이 숫자로 주면 파싱 생각해보기
                          date: `${new Date().getFullYear()}.${String(
                            new Date().getMonth() + 1
                          ).padStart(2, "0")}.${String(
                            new Date().getDate()
                          ).padStart(2, "0")}`, // 파싱 생각해보기
                          content: replyInput,
                          like: false,
                          likeCount: 0,
                          message: 0,
                          img: "",
                          target: "",
                        });
                        setComments(updatedComments);
                        setreplyInput("");
                        setIsAddReply(false);
                      }}
                    >
                      등록
                    </div>
                  </div>
                </ReplyInput>
              ) : (
                ""
              )} */}
            </>
          ))}
          {isAddReply && commentIdx === replyTargetIdx ? (
            <ReplyInput
              style={{ width: "90%" }}
              ref={replyIRef}
              onSubmit={(e) => {
                e.preventDefault();
                onEnterReply(commentIdx);
              }}
            >
              <input
                type="text"
                placeholder={`${replyTarget}님 댓글에 답글쓰기`}
                onChange={(e) => setreplyInput(e.target.value)}
                value={replyInput}
              />
              <div className="reply-title">답글쓰기</div>
              <div className="reply-option">
                <div
                  className="reply-option__item"
                  onClick={() => setIsAddReply(false)}
                >
                  취소
                </div>
                <div
                  className="reply-option__item"
                  onClick={() => {
                    onEnterReply(commentIdx);
                  }}
                >
                  등록
                </div>
              </div>
            </ReplyInput>
          ) : (
            ""
          )}
          <HorizontalLine color="#929292" height="1px" />
        </>
      ))}
      <ReplyInput
        onSubmit={(e) => {
          e.preventDefault();
          onEnterComment();
        }}
      >
        <input
          type="text"
          placeholder="여기에 댓글을 입력해주세요."
          onChange={(e) => setCommentInput(e.target.value)}
          value={commentInput}
        />
        <div className="reply-title">댓글쓰기</div>
        <div className="reply-option">
          <div className="reply-option__item" onClick={onEnterComment}>
            등록
          </div>
        </div>
      </ReplyInput>
    </>
  );
};

export default CommentItem;

const Comment = styled.div`
  width: 100%;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  > header {
    background-color: #eeeeee;
    width: 100%;
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.8rem 2rem;
    box-sizing: border-box;
    .header-left {
      display: flex;
      gap: 3rem;
      .img-container {
        background-image: ${(props) =>
          props.img
            ? `url(${props.img})`
            : `url("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png")`};
        background-size: cover;
        width: 3.5rem;
        height: 3.5rem;
        border-radius: 50%;
        border: 1px solid black;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.3rem;
        color: black;
        .name {
          font-size: 1.2rem;
          font-weight: 600;
        }
        .date {
          font-size: 1rem;
          /* color: #4f4f4f; */
        }
      }
    }
    .category {
      font-size: 1.3rem;
      font-weight: 600;
      color: #fee501;
    }
    .icon-wrapper {
      display: flex;
      gap: 1rem;
    }
  }
  > main {
    padding: 2rem 3rem 0;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    font-size: 1.2rem;
    line-height: 2rem;
    color: black;
    .main-title {
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
  > footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 4rem;
    padding: 0 3rem;
    box-sizing: border-box;
    color: black;
    .footer-left {
      display: flex;
      gap: 0.5rem;
      .icon {
        font-size: 1.4rem;
        cursor: pointer;
      }
      span {
        font-size: 1.2rem;
        margin-right: 1rem;
      }
    }
  }
`;

const ReplyInput = styled.form`
  width: 100%;
  /* border: 1px solid black; */
  font-size: 1.2rem;
  position: relative;
  > input {
    width: 100%;
    padding: 4rem 3rem;
    box-sizing: border-box;
    font-size: 1.1rem;
    border: 1px solid gray;
    border-radius: 10px;
  }
  .reply-title {
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    font-weight: 600;
  }
  .reply-option {
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 1.2rem;
    right: 2rem;
    color: gray;
    font-weight: 600;
    &__item:hover {
      cursor: pointer;
      color: black;
    }
  }
`;
