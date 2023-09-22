import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const PostList = ({ posts }) => {
  return (
    <>
      {posts.map((item, idx) => (
        <Post key={idx} img={item.img}>
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
            <div className="header-right">
              <div className="category">{item.category}</div>
            </div>
          </header>
          <main>{item.content}</main>
          <footer>
            <FontAwesomeIcon icon={faHeart} className="icon" />
            <span>{item.like}</span>
            <FontAwesomeIcon icon={faMessage} className="icon" />
            <span>{item.message}</span>
          </footer>
        </Post>
      ))}
    </>
  );
};

export default PostList;

const Post = styled.div`
  display: flex;
  flex-direction: column;
  border: 1.5px solid #b3b3b3;
  border-radius: 5px;
  height: 17rem;
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
  }
  main {
    padding: 2rem 3rem;
    width: 100%;
    height: 50%;
    box-sizing: border-box;
    font-size: 1rem;
    line-height: 1.5rem;
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
    }
    span {
      font-size: 1rem;
      margin-right: 1rem;
    }
  }
`;
