import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faHeart as faHeartFull,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dateParse } from "../../utils/dateParse";

const PostList = ({ posts, postStyle }) => {
  const postStyleRendering = (item) => {
    switch (postStyle) {
      case "category":
        return <div className="category">{item.category}</div>;
      case "edit": // onClick 시 item 과 연관지어서 함수 실행 추가하기
        return (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPencil} className="icon fa-white" />
          </div>
        );
      case "delete": // onClick 시 item 과 연관지어서 함수 실행 추가하기
        return (
          <div className="icon-wrapper">
            {/* <img src="/svg/delete.svg" alt="edit-btn" className="icon" /> */}
            <FontAwesomeIcon icon={faTrashCan} className="icon fa-white" />
          </div>
        );
      case "editDelete": // onClick 시 item 과 연관지어서 함수 실행 추가하기
        return (
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faPencil} className="icon fa-white" />
            <FontAwesomeIcon icon={faTrashCan} className="icon fa-white" />
          </div>
        );
      default:
        return;
    }
  };
  return (
    <>
      {posts.map((item, idx) => (
        <Post
          key={idx}
          img={item.user.profileImg}
          to={`/community/post/${item.id}`}
        >
          <header>
            <div className="header-left">
              <div className="img-container"></div>
              <div className="info">
                <span className="name">
                  {item.user.nickname || "익명"} (
                  {item.user.isTutor ? "멘토" : "멘티"})
                </span>
                <span className="date">작성일 {dateParse(item.createdAt)}</span>
              </div>
            </div>
            <div className="header-right">{postStyleRendering(item)}</div>
          </header>
          <main>
            <div className="main-title">{item.title}</div>
            <div className="main-content">{item.content}</div>
          </main>
          <footer>
            {item.like ? (
              <FontAwesomeIcon icon={faHeartFull} className="icon heart-full" />
            ) : (
              <FontAwesomeIcon icon={faHeart} className="icon" />
            )}
            <span>{item.heartCnt}</span>
            <FontAwesomeIcon icon={faMessage} className="icon" />
            <span>{item.commentCnt}</span>
          </footer>
        </Post>
      ))}
    </>
  );
};

export default PostList;

const Post = styled(Link)`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #b3b3b3;
  border-radius: 5px;
  height: 17rem;
  text-decoration: none;
  header {
    /* background-color: #eeeeee; */
    background-color: #2f5383;
    width: 100%;
    height: 30%;
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
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
        color: white;
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
  main {
    padding: 2rem 3rem;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.5rem;
    color: black;
    .main-title {
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
  footer {
    display: flex;
    align-items: center;
    height: 20%;
    padding: 0 3rem;
    box-sizing: border-box;
    color: #646464;
    gap: 0.5rem;
    .icon {
      font-size: 1.4rem;
      cursor: pointer;
    }
    span {
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
  .fa-white {
    font-size: 1.4rem;
    color: white;
  }
`;
