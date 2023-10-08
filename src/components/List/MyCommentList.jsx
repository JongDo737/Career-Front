import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage, faTrashCan } from "@fortawesome/free-regular-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const MyCommentList = ({ comments }) => {
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
            <Link
              className="comment-title-wrapper"
              to={`/community/post/${item.articleId}`}
            >
              <div className="comment-title">{item.articleTitle}</div>
              <FontAwesomeIcon
                icon={faChevronRight}
                style={{ fontSize: "1.2rem" }}
              />
            </Link>
          </footer>
        </Comment>
      ))}
    </>
  );
};

export default React.memo(MyCommentList);

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
      color: black;
      text-decoration: none;
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
