import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
  faHeart as faHeartFull,
  faEllipsisVertical,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Link, useParams } from "react-router-dom";
import CommentList from "../../components/List/CommentList";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { dateParse } from "../../utils/dateParse";
import HorizontalLine from "../../components/Line/HorizontalLine";
import { getIdFromToken } from "../../auth/jwtFunctions";
import { CommunityCategoryList } from "../../settings/config";

const PostDetail = () => {
  // const post = {
  //   name: "김성애",
  //   age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
  //   date: "2023.07.30", // 파싱 생각해보기
  //   category: "성적고민",
  //   title: "공대여신 성애의 python project 개강",
  //   content:
  //     "컴퓨터공학과로 진학하고 싶은 분들 있나요? \n어떤 걸 준비해야 하는지 모르거나 막막한 분들은 \n댓글 달아주시거나 상담 신청해주세요~!",
  //   like: true,
  //   likeCount: 10,
  //   message: 4,
  //   img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  // };
  const [post, setPost] = useState({});
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  const [isAddReply, setIsAddReply] = useState(false);
  const [replyTargetIdx, setReplyTargetIdx] = useState(0);
  const [replyTarget, setReplyTarget] = useState("");
  const [commentInput, setCommentInput] = useState("");
  const [replyInput, setreplyInput] = useState("");
  const [postUserId, setPostUserId] = useState();
  const [updateComment, setUpdateComment] = useState(true);
  const [optionClick, setOptionClick] = useState(false);
  const [editPostContent, setEditPostContent] = useState(false);

  const replyInputRef = useRef(null);
  const replyIRef = useRef(null);
  const postInputRef = useRef(null);

  const scrollToReplyInput = () => {
    if (replyIRef.current) {
      replyIRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
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
    axios
      .post(
        `${SV_LOCAL}/community/comment/add`,
        { articleId: id, content: commentInput },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    setCommentInput("");
    setUpdateComment(true);
    // 댓글 쓰고 window.scrollTo(0, document.body.scrollHeight); 적용할 수 있는 방법 찾아보자
  };
  useEffect(() => {
    if (isAddReply && replyInputRef.current) replyInputRef.current.focus();
  }, [isAddReply]);

  const onEditPostContent = () => {
    axios.post(
      `${SV_LOCAL}/community/article/modify`,
      {
        json: JSON.stringify({
          id: post.id,
          categoryId: post.categoryId,
          title: post.title,
          content: post.content,
          removedImageUrls: [],
        }),
      },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
  };

  useEffect(() => {
    if (updateComment) {
      console.log("here");
      axios
        .get(`${SV_LOCAL}/community/article/detail`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
          params: {
            id: id,
          },
        })
        .then((res) => {
          const data = res.data;
          // setPost(data.article);
          // setComments(data.comments);
          // setPostUserId(data.article.user.id);
          console.log(data);
          setPost(data.article);
          setComments(data.comments || []);
          setPostUserId(data.article?.user?.id || "");
        })
        .catch((err) => console.error(err));
      setUpdateComment(false);
    }
  }, [id, updateComment, post, comments]);

  // useEffect(() => {
  //   setUserId(getIdFromToken(getCookie("jwtToken")));
  //   console.log(post.user);
  // }, []);

  const onAddHeart = (type, id) => {
    axios
      .post(
        `${SV_LOCAL}/community/heart/add`,
        { typeId: id, type: type },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (type === 0) setPost(res.article);
        else setComments(res.comments || []);
      })
      .catch((err) => console.log(err));
  };

  const onDeleteHeart = (type, id) => {
    axios
      .delete(
        `${SV_LOCAL}/community/heart/delete`,

        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },

          data: { typeId: id, type: type },
        }
      )
      .then((res) => {
        console.log(res);
        if (type === 0) setPost(res.article);
        else setComments(res.comments || []);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        onEditPostContent();
        setEditPostContent(false);
      }}
    >
      {editPostContent ? (
        <Post img={post.img}>
          <header>
            <select
              name="category-select"
              className="category-select"
              value={post.categoryId} //
              onChange={(e) => {
                setPost({ ...post, categoryId: e.target.value });
              }}
              required
            >
              <option value="">카테고리</option>
              {CommunityCategoryList.map((category, idx) => (
                <option value={idx} key={idx}>
                  {category.title}
                </option>
              ))}
            </select>
            <span className="post-header__title">제목</span>
            <input
              type="text"
              className="post-header__input"
              placeholder="제목을 작성해 주세요."
              value={post.title}
              required
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
          </header>
          <main style={{ padding: "2rem 3rem" }}>
            <textarea
              className={
                editPostContent
                  ? "post-content post-content-write"
                  : "post-content"
              }
              required
              value={post.content}
              disabled={!editPostContent}
              ref={postInputRef}
              onChange={(e) => {
                setPost({ ...post, content: e.target.value });
              }}
            />
          </main>
          <footer>
            <button type="submit">등록</button>
          </footer>
        </Post>
      ) : (
        <Post img={post.img}>
          <header>
            <div className="post-header__title">{post.title}</div>
            <FontAwesomeIcon
              icon={faEllipsisVertical}
              className="post-option__btn"
              onClick={() => {
                setOptionClick((current) => !current);
              }}
            />
            {optionClick ? (
              postUserId === getIdFromToken(getCookie("jwtToken")) ? (
                <div className="post-options">
                  <div className="post-options__item">
                    <FontAwesomeIcon icon={faPencil} className="icon" />
                    <span
                      onClick={() => {
                        setEditPostContent(true);
                        setOptionClick(false);
                        setTimeout(() => {
                          postInputRef.current.focus();
                          const textLength = postInputRef.current.value.length;
                          postInputRef.current.setSelectionRange(
                            textLength,
                            textLength
                          );
                        }, 0);
                      }}
                    >
                      편집
                    </span>
                  </div>
                  <div className="post-options__item">
                    <FontAwesomeIcon icon={faTrashCan} className="icon" />
                    <span>삭제</span>
                  </div>
                </div>
              ) : (
                <div className="post-options">
                  <div className="post-options__item">
                    <FontAwesomeIcon icon={faPencil} className="icon" />
                    <span>신고</span>
                  </div>
                </div>
              )
            ) : (
              ""
            )}
          </header>
          <main>
            <div className="post-main-info">
              <div className="post-main-info__img"></div>
              <span className="post-main-info__name">
                {post.user?.nickname || ""} (
                {post.user?.isTutor ? "멘토" : "멘티"})
              </span>
            </div>
            <div className="post-date">
              작성일 {dateParse(post.createdAt)}
              {post.createdAt !== post.updatedAt ? " (수정됨)" : ""}
            </div>
            <textarea
              className={
                editPostContent
                  ? "post-content post-content-write"
                  : "post-content"
              }
              value={post.content}
              disabled={!editPostContent}
              ref={postInputRef}
              onChange={(e) => {
                setPost({ ...post, content: e.target.value });
              }}
            />
          </main>

          <footer>
            {post.isHeartClicked ? (
              <FontAwesomeIcon
                icon={faHeartFull}
                className="icon heart-full"
                onClick={() => {
                  console.log("clicked");
                  setPost({ ...post, isHeartClicked: false });
                }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                className="icon"
                onClick={() => {
                  console.log("clicked");
                  setPost({ ...post, isHeartClicked: true });
                }}
              />
            )}
            <span>{post.heartCnt}</span>
            <FontAwesomeIcon icon={faMessage} className="icon" />
            <span>{comments.length}</span>
          </footer>
        </Post>
      )}
      <CommentWrapper>
        <div
          style={{
            fontSize: "1.35rem",
            fontWeight: "500",
            margin: "1rem 0",
            width: "100%",
            textAlign: "start",
          }}
        >
          댓글 ({comments.length})
        </div>
        {/*위 댓글수와 중복되긴 함*/}
        {comments.map((comment, commentIdx) => (
          <Fragment key={comment.id}>
            <Comment img={comment.img}>
              <header>
                <div className="header-left">
                  <div className="img-container"></div>
                  <div className="info">
                    <span className="name">
                      {comment.user.nickname || "익명"} (
                      {comment.user.isTutor ? "멘토" : "멘티"})
                    </span>
                    <span className="date">
                      작성일 {dateParse(comment.createdAt)}
                    </span>
                  </div>
                </div>
              </header>
              <main>
                <div className="main-content">{comment.content}</div>
              </main>
              <footer>
                <div className="footer-left">
                  {comment.isHeartClicked ? (
                    <FontAwesomeIcon
                      icon={faHeartFull}
                      className="icon heart-full"
                      onClick={() => {
                        onDeleteHeart(1, comment.id); //댓글은 type 1
                        setUpdateComment(true);
                      }}
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faHeart}
                      className="icon"
                      onClick={() => {
                        onAddHeart(1, comment.id); //댓글은 type 1
                        setUpdateComment(true);
                      }}
                    />
                  )}
                  <span>{comment.heartCnt}</span>
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
            {comment.recomments.map((recomment, idx) => (
              <Comment img={recomment.img} key={idx} style={{ width: "90%" }}>
                <header>
                  <div className="header-left">
                    <div className="img-container"></div>
                    <div className="info">
                      <span className="name">
                        {recomment.user.nickname} (
                        {recomment.user.isTutor ? "멘토" : "멘티"})
                      </span>
                      <span className="date">작성일 {recomment.date}</span>
                    </div>
                  </div>
                </header>
                <main>
                  <div className="main-content">
                    {recomment.target && (
                      <span style={{ color: "#2F5383", fontWeight: "600" }}>
                        @{recomment.target}
                      </span>
                    )}
                    {recomment.content}
                  </div>
                </main>
                <footer>
                  <div className="footer-left">
                    {recomment.isHeartClicked ? (
                      <FontAwesomeIcon
                        icon={faHeartFull}
                        className="icon heart-full"
                        onClick={() => {
                          onDeleteHeart(2, recomment.id); //대댓글은 type 2
                          setUpdateComment(true);
                        }}
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faHeart}
                        className="icon"
                        onClick={() => {
                          onAddHeart(2, recomment.id); //대댓글은 type 2
                          setUpdateComment(true);
                        }}
                      />
                    )}
                    <span>{recomment.heartCnt}</span>
                  </div>
                </footer>
              </Comment>
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
          </Fragment>
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
      </CommentWrapper>
      <UtilBox>
        <Link className="util-item write" to={"/community/write"}>
          <FontAwesomeIcon icon={faPencil} />
          <span>글쓰기</span>
        </Link>
        <div className="util-item up" onClick={ScrollUp}>
          <FontAwesomeIcon icon={faChevronUp} />
          <span>위로</span>
        </div>
      </UtilBox>
    </Form>
  );
};

export default PostDetail;

const Form = styled.form`
  display: flex;
  margin: 8rem 0;
  align-items: center;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Post = styled.div`
  width: 60rem;
  border: 1px solid black;
  border-radius: 10px;
  overflow: hidden;
  > header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    background-color: #2f5383;
    color: white;
    position: relative;
    height: 2rem;
    gap: 2rem;
    .category-select {
      width: 10rem;
      height: 2.3rem;
      text-align: center;
      background-color: #f5f5f5;
      border-radius: 5px;
      &__info {
        position: absolute;
        left: 4rem;
        top: 4rem;
        font-size: 1rem;
        color: red;
      }
    }
    .post-header__title {
      font-size: 1.4rem;
      font-weight: 600;
    }
    .post-header__input {
      width: 60%;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0.5rem;
    }
    .post-option__btn {
      position: absolute;
      right: 2rem;
      font-size: 1.4rem;
      cursor: pointer;
    }
    .post-options {
      position: absolute;
      top: 4rem;
      right: 1.4rem;
      padding: 1rem;
      border: 1px solid gray;
      border-radius: 0.8rem;
      background-color: white;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
      z-index: 99;
      &__item {
        display: flex;
        justify-content: center;
        gap: 1rem;
        font-size: 1.3rem;
        cursor: pointer;
        .icon,
        span {
          color: black;
          &:hover {
            font-weight: 700;
          }
        }
      }
    }
  }
  > main {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 0;
    gap: 0.5rem;
    position: relative;

    .post-date {
      position: absolute;
      top: 1.7rem;
      right: 2rem;
      font-size: 1.2rem;
    }
    .post-main-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      &__img {
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
      &__name {
        font-size: 1.2rem;
        font-weight: 600;
      }
    }
    .post-content {
      font-size: 1.2rem;
      line-height: 2.5rem;
      border: none;
      background-color: transparent;
      color: black;
      resize: none;
    }
    .post-content-write {
      min-height: 25rem;
      vertical-align: top;
      align-items: start;
    }
  }
  > footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 4rem;
    padding: 0 1rem;
    box-sizing: border-box;
    color: #646464;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      cursor: pointer;
    }
    span {
      font-size: 1.2rem;
      margin-right: 1rem;
    }
    > button {
      width: 5rem;
      height: 2.5rem;
      align-items: center;
      background-color: #516a8b;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-right: 1.5rem;
      font-size: 1.2rem;
      &:hover {
        background-color: #2f5383;
      }
    }
  }
`;

const CommentWrapper = styled.div`
  width: 60rem;
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 1rem;
`;
const UtilBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  bottom: 2rem;
  right: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.3rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  .write {
    background-color: #eaeaea;
    text-decoration: none;
    color: black;
  }
  .up {
    background-color: #23354d;
    color: white;
  }
`;

const CategoryLayout = styled.div`
  width: 70rem;
  display: grid;
  grid-template-columns: repeat(2, 35rem);
  grid-gap: 2rem;
`;

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
