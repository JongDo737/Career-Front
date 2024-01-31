import React, { useRef, Fragment, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartFull } from "@fortawesome/free-solid-svg-icons";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import HorizontalLine from "../Line/HorizontalLine";
import { DefaultImg } from "../../settings/config";
import { dateParse } from "../../utils/ParseFormat";
import OptionButton from "../Button/OptionButton";
import { SV_LOCAL } from "../../constants";
import axios from "axios";
import { getCookie } from "../../cookie";
import ProfileImage from "../Image/ProfileImage";
import {
  CommentContainer,
  CommentHeader,
  CommentMain,
  ProfileInfo,
} from "../../styles/common/postComponents";
import RecommentList from "./RecommentList";
import { onAddHeart, onDeleteHeart } from "../../api/heartPost";
import ReplyInput from "../Input/ReplyInput";
import { useParams } from "react-router-dom";

const CommentItem = (props) => {
  const {
    comments,
    setComments,
    editCommentContent,
    setEditCommentContent,
    commentInputRef,
    originalPost,
    setUpdateComment,
    activeOptionId,
    setActiveOptionId,
  } = props;
  const [editRecommentContent, setEditRecommentContent] = useState(false);
  const replyIRef = useRef(null);
  const scrollToReplyInput = () => {
    if (replyIRef.current) {
      replyIRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const { id: postId } = useParams();
  const [recommentInput, setRecommentInput] = useState("");
  const recommentInputRef = useRef(null);
  const recommentRef = useRef(null);
  const [isAddReply, setIsAddReply] = useState(false);
  const [replyTargetIdx, setReplyTargetIdx] = useState(0);

  const onEnterRecomment = (commentIdx) => {
    axios
      .post(
        `${SV_LOCAL}/community/recomment/add`,
        {
          articleId: postId,
          commentId: comments[commentIdx].id,
          content: recommentInput,
        },
        {
          headers: {
            "ngrok-skip-browser-warning": "69420",
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .catch((err) => console.error(err));
    setRecommentInput("");
    setUpdateComment(true);
  };

  const onEditCommentContent = (id, commentIdx) => {
    console.log(getCookie("jwtToken"), id, comments[commentIdx].content);
    axios
      .post(
        `${SV_LOCAL}/community/comment/modify`,
        {
          id: id,
          content: comments[commentIdx].content,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then(() => {
        setEditCommentContent("");
        setUpdateComment(true);
      });
  };

  const onEditRecommentContent = (id, commentIdx, recommentIdx) => {
    axios
      .post(
        `${SV_LOCAL}/community/recomment/modify`,
        {
          id: id,
          content: comments[commentIdx].recomments[recommentIdx].content,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then(() => {
        setEditRecommentContent("");
        setUpdateComment(true);
      });
  };

  useEffect(() => {
    if (isAddReply && recommentInputRef.current)
      recommentInputRef.current.focus();
  }, [isAddReply]);

  return (
    <>
      {comments.map((comment, commentIdx) => (
        <Fragment key={comment.id}>
          <CommentContainer>
            <CommentHeader>
              <ProfileInfo>
                <ProfileImage profileImg={comment.img || DefaultImg} />
                <div className="info">
                  <span className="name">
                    {comment.user.nickname || "익명"} (
                    {comment.user.isTutor ? "멘토" : "멘티"})
                  </span>
                  <span className="date">
                    작성일 {dateParse(comment.createdAt)}
                    {comment.createdAt !== comment.updatedAt ? " (수정됨)" : ""}
                  </span>
                </div>
              </ProfileInfo>
              <OptionButton
                setEditContent={setEditCommentContent}
                inputRef={commentInputRef[commentIdx]}
                checkId={comment.user.id}
                option="댓글"
                ids={{ commentId: comment.id }}
                activeOptionId={activeOptionId}
                setActiveOptionId={setActiveOptionId}
              />
            </CommentHeader>
            <CommentMain>
              <textarea
                className={
                  editCommentContent === comment.id
                    ? "main-content-write main-content"
                    : "main-content"
                }
                disabled={!(editCommentContent === comment.id)}
                value={comment.content}
                ref={(inputRef) => {
                  if (!commentInputRef[commentIdx]) {
                    commentInputRef[commentIdx] = React.createRef();
                  }
                  commentInputRef[commentIdx].current = inputRef;
                }}
                onChange={(e) => {
                  const updatedComment = [...comments];
                  updatedComment[commentIdx] = {
                    ...updatedComment[commentIdx],
                    content: e.target.value,
                  };
                  setComments(updatedComment);
                }}
              />
            </CommentMain>

            {editCommentContent === comment.id ? (
              <footer
                style={{
                  justifyContent: "flex-end",
                  padding: "0 2.5rem",
                  gap: "0.5rem",
                }}
              >
                <button
                  style={{ margin: "0" }}
                  onClick={() => {
                    setEditCommentContent("");
                    const updatedComment = [...comments];
                    updatedComment[commentIdx] = {
                      ...updatedComment[commentIdx],
                      content: originalPost.comments[commentIdx].content,
                    };
                    setComments(updatedComment);
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{ margin: "0" }}
                  onClick={() => {
                    onEditCommentContent(comment.id, commentIdx);
                  }}
                >
                  등록
                </button>
              </footer>
            ) : (
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
                  <FontAwesomeIcon icon={faMessage} className="icon" />
                  <span>{comment.recommentCnt}</span>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setIsAddReply(true);
                      setReplyTargetIdx(commentIdx);
                      scrollToReplyInput();
                      setTimeout(() => {
                        recommentRef.current.focus();
                      }, 0);
                    }}
                  >
                    답글쓰기
                  </span>
                </div>
              </footer>
            )}
          </CommentContainer>
          <RecommentList
            comment={comment}
            commentIdx={commentIdx}
            onEditRecommentContent={onEditRecommentContent}
            setComments={setComments}
            originalPost={originalPost}
            comments={comments}
            setEditRecommentContent={setEditRecommentContent}
            editRecommentContent={editRecommentContent}
            recommentInputRef={recommentInputRef}
            activeOptionId={activeOptionId}
            setActiveOptionId={setActiveOptionId}
          />
          {isAddReply && commentIdx === replyTargetIdx && (
            <ReplyInput
              commentIdx={commentIdx}
              isAddReply={isAddReply}
              replyTargetIdx={replyTargetIdx}
              onEnterRecomment={onEnterRecomment}
              setIsAddReply={setIsAddReply}
              recommentRef={recommentRef}
              recommentInput={recommentInput}
              setRecommentInput={setRecommentInput}
              comment={comment}
            />
          )}
          <HorizontalLine color="#929292" height="1px" />
        </Fragment>
      ))}
    </>
  );
};
export default CommentItem;
