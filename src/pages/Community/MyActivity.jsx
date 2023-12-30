import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PointBox from "../../components/Box/PointBox";
import MoveBox from "../../components/Box/MoveBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import HorizontalLine from "../../components/Line/HorizontalLine";
import EventList from "../../components/List/EventList";
import MentorList from "../../components/List/MentorList";
import PostList from "../../components/List/PostList";
import MyCommentList from "../../components/List/MyCommentList";
import SubMenubar from "../../components/Menubar/SubMenubar";
import { CommunityMenu, CommunityMenuLinkList } from "../../settings/config";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import { colors } from "../../styles/common/theme";

const MyActivity = () => {
  const subMenuList = CommunityMenu;
  const subMenuLinkList = CommunityMenuLinkList;
  const [selectMenu, setSelectMenu] = useState(0);
  const menuList = ["작성한 게시글", "좋아요한 게시글", "댓글 목록"];
  const [comments, setComments] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [myPosts, setMyPosts] = useState([]);
  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };

  useEffect(() => {}, [selectMenu]);

  const selectedMenuRendering = () => {
    if (selectMenu === 0) {
      const posts = [];
      return (
        <PostWrapper>
          <div className="selected-menu-header">내가 작성한 게시글</div>
          <PostList posts={myPosts} setPosts={setMyPosts} postStyle="delete" />
        </PostWrapper>
      );
    } else if (selectMenu === 1) {
      //post 부분은 axios 로 추후 수정
      // const posts = [
      //   {
      //     name: "김성애",
      //     age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
      //     date: "2023.07.30", // 파싱 생각해보기
      //     category: "성적고민",
      //     title: "공대여신 성애의 python project 개강",
      //     content:
      //       "컴퓨터공학과로 진학하고 싶은 분들 있나요? 어떤 걸 준비해야 하는지 모르거나 막막한 분들은 댓글 달아주시거나 상담 신청해주세요~!",
      //     like: true,
      //     likeCount: 10,
      //     message: 4,
      //     img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
      //   },
      //   {
      //     name: "채희문",
      //     age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      //     date: "2023.07.29", // 파싱 생각해보기
      //     category: "진로고민",
      //     title: "채사장의 python project 개강",
      //     content:
      //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      //     like: true,
      //     likeCount: 25,
      //     message: 11,
      //     img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
      //   },
      //   {
      //     name: "신종민",
      //     age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      //     date: "2023.07.29", // 파싱 생각해보기
      //     category: "진로고민",
      //     title: "신사장의 python project 개강",
      //     content:
      //       "컴퓨터공학과로 진학하고 싶은 분들 있나요? 어떤 걸 준비해야 하는지 모르거나 막막한 분들은 댓글 달아주시거나 상담 신청해주세요~!",
      //     like: true,
      //     likeCount: 4,
      //     message: 13,
      //     img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
      //   },
      //   {
      //     name: "한재준",
      //     age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      //     date: "2023.07.28", // 파싱 생각해보기
      //     category: "진로고민",
      //     title: "한사장의 python project 개강",
      //     content:
      //       "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      //     like: true,
      //     likeCount: 21,
      //     message: 7,
      //     img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
      //   },
      //   {
      //     name: "아무개",
      //     age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      //     date: "2023.07.27", // 파싱 생각해보기
      //     category: "진로고민",
      //     content:
      //       "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      //     like: true,
      //     likeCount: 5,
      //     message: 13,
      //     img: "",
      //   },
      // ];
      return (
        <PostWrapper>
          <div className="selected-menu-header">내가 좋아요 누른 게시글</div>
          <PostList posts={likedPosts} setPosts={setLikedPosts} />
        </PostWrapper>
      );
    } else if (selectMenu === 2) {
      return (
        <PostWrapper>
          <div className="selected-menu-header">내가 남긴 댓글</div>
          <MyCommentList comments={comments} setComments={setComments} />
        </PostWrapper>
      );
      //   {
      //     content: "와 저도 참여할래요~",
      //     date: "2023.09.23", // 파싱 생각해보기
      //     postTitle: "부산사나이 종민의 스프링 특강 오픈합니다!",
      //   },
      //   {
      //     content: "채사장 인기멘토 등극이네요 ㅎ",
      //     date: "2023.09.23", // 파싱 생각해보기
      //     postTitle:
      //       "채사장은 오늘도 열일 중이에요. 채사장은 어제도 열일했는데 오늘도 하고 있어요. 대단해요. ",
      //   },
      //   {
      //     content: "아 진짜 할 일 많다아아아아아 그래도 해야지 어쩌겠어 ㅋ",
      //     date: "2023.09.23", // 파싱 생각해보기
      //     postTitle: "성애의 열심히 개발하는 삶..",
      //   },
      //   {
      //     content: "한사장 파이팅~ 힘내자구",
      //     date: "2023.09.23", // 파싱 생각해보기
      //     postTitle: "한사장의 개발 일기",
      //   },
      // ];
      // let comments = [];
    }
  };

  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/community/article/my_articles`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
        params: {
          page: 0,
          size: 10,
        },
      })
      .then((res) => {
        // const comments = res.data;
        setMyPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, [myPosts.length]);

  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/community/heart/my_hearts`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
        params: {
          page: 0,
          size: 10,
        },
      })
      .then((res) => {
        // const comments = res.data;
        setLikedPosts(res.data);
      })
      .catch((err) => console.error(err));
  }, [likedPosts.length]);
  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/community/comment/my_comments`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
        params: {
          page: 0,
          size: 10,
        },
      })
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.error(err));
  }, [comments.length]);
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[2]} // 활동 내역
        subMenuLinkList={subMenuLinkList}
      />
      <Form>
        <FormLeft>
          <div className="menu-list">
            {menuList.map((item, idx) => (
              <div
                key={idx}
                className={
                  selectMenu === idx
                    ? "menu-list__item menu-list__item-selected"
                    : "menu-list__item"
                }
                onClick={() => setSelectMenu(idx)}
              >
                {item}
              </div>
            ))}
            {/*댓글 목록이라고 하는 게 좋을지?*/}
          </div>
        </FormLeft>
        {/* <VerticalLine /> */}
        <FormRight>{selectedMenuRendering()}</FormRight>
        <UtilBox>
          <div className="util-item up" onClick={ScrollUp}>
            <FontAwesomeIcon icon={faChevronUp} />
            <span>위로</span>
          </div>
        </UtilBox>
      </Form>
    </>
  );
};

export default MyActivity;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 20rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 6rem;
  margin-top: 2rem;
  .menu-list {
    &__item {
      font-size: 1.4rem;
      padding: 0.8rem;
      border-bottom: 1px solid black;
      cursor: pointer;
    }
    &__item-selected,
    &__item:hover {
      background-color: #f4f4f4;
      font-weight: 600;
    }
  }
`;

const FormRight = styled.div`
  min-width: 50rem;
  max-width: 70rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 8rem;
  border-left: 1px solid #bcbcbc;
`;

const PostWrapper = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  gap: 2rem;
  .selected-menu-header {
    font-size: 1.8rem;
    font-weight: 600;
    text-align: center;
    margin: 1rem 0 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  .header {
    margin: 50px 0;
    font-size: 2rem;
    font-weight: 700;
    color: ${colors.primaryBlue};
    text-decoration: underline;
  }
  .notice {
    width: 95%;
    text-align: end;
    font-size: 1.1rem;
    color: #334b6c;
    font-weight: 600;
    margin-bottom: 1rem;
  }
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
  .up {
    background-color: ${colors.primaryBlue};
    color: white;
  }
`;
