import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
  faHeart as faHeartFull,
} from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faMessage,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import CommentList from "../../components/List/CommentList";

const PostDetail = () => {
  const post = {
    name: "김성애",
    age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
    date: "2023.07.30", // 파싱 생각해보기
    category: "성적고민",
    title: "공대여신 성애의 python project 개강",
    content:
      "컴퓨터공학과로 진학하고 싶은 분들 있나요? \n어떤 걸 준비해야 하는지 모르거나 막막한 분들은 \n댓글 달아주시거나 상담 신청해주세요~!",
    like: true,
    likeCount: 10,
    message: 4,
    img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
  };

  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };
  return (
    <Form>
      <Post img={post.img}>
        <header>
          <div className="post-header-title">수능 최저가 필요해요..ㅠㅠ</div>
          <div className="post-header-date">작성일 {post.date}</div>
        </header>
        <main>
          <div className="post-main-info">
            <div className="post-main-info__img"></div>
            <span className="post-main-info__name">
              {post.name} ({post.age})
            </span>
          </div>
          <pre className="post-main-content">{post.content}</pre>
        </main>
        <footer>
          {post.like ? (
            <FontAwesomeIcon icon={faHeartFull} className="icon heart-full" />
          ) : (
            <FontAwesomeIcon icon={faHeart} className="icon" />
          )}
          <span>{post.likeCount}</span>
          <FontAwesomeIcon icon={faMessage} className="icon" />
          <span>{post.message}</span>
        </footer>
      </Post>
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
          댓글 (10)
        </div>
        <CommentList />
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

const Form = styled.div`
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
  position: relative;
  > header {
    display: flex;
    justify-content: center;
    padding: 1.5rem;
    background-color: #2f5383;
    color: white;
    .post-header-title {
      font-size: 1.4rem;
      font-weight: 600;
    }
    .post-header-date {
      position: absolute;
      top: 1.7rem;
      right: 2rem;
      font-size: 1.2rem;
    }
  }
  > main {
    display: flex;
    flex-direction: column;
    padding: 2rem 3rem 0;
    gap: 0.5rem;
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
    .post-main-content {
      font-size: 1.2rem;
      line-height: 2.5rem;
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
