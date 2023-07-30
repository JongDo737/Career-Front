import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faMessage } from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";

const PostList = () => {
  const posts = [
    {
      name: "김성애",
      age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.30", // 파싱 생각해보기
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      like: 10,
      message: 4,
      img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    },
    {
      name: "채희문",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      like: 25,
      message: 11,
      img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
    },
    {
      name: "신종민",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      like: 4,
      message: 13,
      img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
    },
    {
      name: "한재준",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.28", // 파싱 생각해보기
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      like: 21,
      message: 7,
      img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
    },
    {
      name: "아무개",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.27", // 파싱 생각해보기
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      like: 5,
      message: 13,
      img: "",
    },
    {
      name: "김성애",
      age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.30", // 파싱 생각해보기
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      like: 10,
      message: 4,
      img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    },
    {
      name: "채희문",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      like: 25,
      message: 11,
      img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
    },
    {
      name: "신종민",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      like: 4,
      message: 13,
      img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
    },
    {
      name: "한재준",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.28", // 파싱 생각해보기
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      like: 21,
      message: 7,
      img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
    },
    {
      name: "아무개",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.27", // 파싱 생각해보기
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      like: 5,
      message: 13,
      img: "",
    },
  ];
  return (
    <>
      {posts.map((item, idx) => (
        <Post key={idx} img={item.img}>
          <header>
            <div className="img-container"></div>
            <div className="info">
              <span className="name">
                {item.name} ({item.age})
              </span>
              <span className="date">작성일 {item.date}</span>
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
    background-color: #eeeeee;
    width: 100%;
    height: 30%;
    border-bottom: 1px solid #b3b3b3;
    display: flex;
    align-items: center;
    gap: 3rem;
    padding: 0 2rem;
    box-sizing: border-box;
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
      gap: 0.3rem;
      .name {
        font-size: 1.2rem;
        font-weight: 600;
      }
      .date {
        font-size: 1rem;
        color: #4f4f4f;
      }
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
