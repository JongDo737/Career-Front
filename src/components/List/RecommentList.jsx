import React from "react";
import ProfileImage from "../Image/ProfileImage";
import { DefaultImg } from "../../settings/config";
import {
  CommentContainer,
  CommentHeader,
  CommentMain,
  ProfileInfo,
} from "../../styles/common/postComponents";
import { onAddHeart, onDeleteHeart } from "../../api/heartPost";
import { dateParse } from "../../utils/ParseFormat";
import OptionButton from "../Button/OptionButton";
import { HeartButton } from "../Button/HeartButton";
import { onEditRecommentContent } from "../../api/editPost";

const RecommentList = (props) => {
  const {
    comment,
    commentIdx,
    setComments,
    originalPost,
    comments,
    setEditRecommentContent,
    editRecommentContent,
    recommentInputRef,
    activeOptionId,
    setActiveOptionId,
    setUpdate,
  } = props;
  return (
    <>
      {comment.recomments &&
        comment.recomments.map((recomment, recommentIdx) => (
          <CommentContainer
            img={recomment.img || ""}
            key={recommentIdx}
            style={{ width: "90%" }}
          >
            <CommentHeader>
              <ProfileInfo>
                <ProfileImage profileImg={recomment.img} />
                <div className="info">
                  <span className="name">
                    {recomment.user.nickname || "익명"} (
                    {recomment.user.isTutor ? "멘토" : "멘티"})
                  </span>
                  <span className="date">
                    작성일 {dateParse(recomment.createdAt)}
                    {recomment.createdAt !== recomment.updatedAt
                      ? " (수정됨)"
                      : ""}
                  </span>
                </div>
              </ProfileInfo>
              <OptionButton
                option="대댓글"
                idx={recomment.id}
                setEditContent={setEditRecommentContent}
                inputRef={recommentInputRef[recommentIdx]}
                checkId={recomment.user.id}
                ids={{
                  recommentId: recomment.id,
                  commentId: comment.id,
                }}
                activeOptionId={activeOptionId}
                setActiveOptionId={setActiveOptionId}
              />
            </CommentHeader>
            <CommentMain>
              <textarea
                className={
                  editRecommentContent === recomment.id
                    ? "main-content-write main-content"
                    : "main-content"
                }
                disabled={!(editRecommentContent === recomment.id)}
                value={recomment.content}
                ref={(inputRef) => {
                  if (!recommentInputRef[recommentIdx]) {
                    recommentInputRef[recommentIdx] = React.createRef();
                  }
                  recommentInputRef[recommentIdx].current = inputRef;
                }}
                onChange={(e) => {
                  const updatedComments = [...comments];
                  const updatedComment = {
                    ...updatedComments[commentIdx],
                  };
                  const updatedRecomments = [...updatedComment.recomments];
                  updatedRecomments[recommentIdx] = {
                    ...updatedRecomments[recommentIdx],
                    content: e.target.value,
                  };
                  updatedComment.recomments = updatedRecomments;
                  updatedComments[commentIdx] = updatedComment;
                  setComments(updatedComments);
                }}
              />
            </CommentMain>
            {editRecommentContent === recomment.id ? (
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
                    setEditRecommentContent("");
                    const updatedComments = [...comments];
                    const updatedComment = {
                      ...updatedComments[commentIdx],
                    };
                    const updatedRecomments = [...updatedComment.recomments];
                    updatedRecomments[recommentIdx] = {
                      ...updatedRecomments[recommentIdx],
                      content:
                        originalPost.comments[commentIdx].recomments[
                          recommentIdx
                        ].content,
                    };
                    updatedComment.recomments = updatedRecomments;
                    updatedComments[commentIdx] = updatedComment;
                    setComments(updatedComments);
                  }}
                >
                  취소
                </button>
                <button
                  type="submit"
                  style={{ margin: "0" }}
                  onClick={() => {
                    onEditRecommentContent(
                      recomment.id,
                      comments[commentIdx].recomments[recommentIdx].content
                    );
                    setEditRecommentContent("");
                  }}
                >
                  등록
                </button>
              </footer>
            ) : (
              <footer>
                <div className="footer-left">
                  <HeartButton
                    isHeartClicked={recomment.isHeartClicked}
                    onClick={() => {
                      if (recomment.isHeartClicked)
                        onDeleteHeart(2, recomment.id);
                      else onAddHeart(2, recomment.id); // 대댓글은 type 2
                      //   setUpdateComment(true);
                      setUpdate(true);
                    }}
                  />
                  <span>{recomment.heartCnt}</span>
                </div>
              </footer>
            )}
          </CommentContainer>
        ))}
    </>
  );
};

export default RecommentList;
