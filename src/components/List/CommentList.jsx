import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styled from "styled-components";

const CommentList = ({ comments }) => {
  return (
    <>
      {comments.map((item, idx) => (
        <Comment key={idx}>
          <header>
            <FontAwesomeIcon icon={faMessage} className="icon" />
            <div className="comment-content">{item.content}</div>
            <div className="comment-date">작성일 {item.date}</div>
            <FontAwesomeIcon
              icon={faTrashCan}
              className="icon"
              style={{ cursor: "pointer" }}
            />
          </header>
          <footer>
            <div className="comment-title-wrapper">
              <div className="comment-title">{item.postTitle}</div>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "1.2rem" }}
              />
            </div>
          </footer>
        </Comment>
      ))}
    </>
  );
};

export default CommentList;

const Comment = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  header {
    display: flex;
    gap: 1rem;
    align-items: start;
    .icon {
      font-size: 1.4rem;
      width: 2rem;
    }
    .comment-content {
      font-size: 1.3rem;
      flex: 1;
    }
    .comment-date {
      font-size: 1.2rem;
      width: 12rem;
      text-align: end;
    }
  }
  footer {
    display: flex;
    justify-content: flex-end;
    .comment-title-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 1rem;
      width: 70%;
      cursor: pointer;
      .comment-title {
        font-size: 1.2rem;
        font-weight: 700;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;
