import React, { useEffect, useState } from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import PostList from "../../components/List/PostList";
import CategoryList from "../../components/List/CategoryList";
import CommunityWrite from "./CommunityWrite";
import { Outlet } from "react-router-dom";

const Community = () => {
  const subMenuList = ["전체보기", "카테고리", "활동 내역"];
  const subMenuLinkList = [
    "/community",
    "/community/category",
    "/community/activity",
  ];
  const [subMenu, setSubMenu] = useState(subMenuList[0]);
  const [isWrite, setIsWrite] = useState(false);
  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    // setIsWrite(false);
  }, [subMenu]);

  const posts = [
    {
      name: "김성애",
      age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.30", // 파싱 생각해보기
      category: "성적고민",
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      likeCount: 10,
      message: 4,
      img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    },
    {
      name: "채희문",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      category: "진로고민",
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      likeCount: 25,
      message: 11,
      img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
    },
    {
      name: "신종민",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      category: "진로고민",
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      likeCount: 4,
      message: 13,
      img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
    },
    {
      name: "한재준",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.28", // 파싱 생각해보기
      category: "공부고민",
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      likeCount: 21,
      message: 7,
      img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
    },
    {
      name: "아무개",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.27", // 파싱 생각해보기
      category: "진로고민",
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      likeCount: 5,
      message: 13,
      img: "",
    },
    {
      name: "김성애",
      age: "고3", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.30", // 파싱 생각해보기
      category: "성적고민",
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      likeCount: 10,
      message: 4,
      img: "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    },
    {
      name: "채희문",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      category: "진로고민",
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      likeCount: 25,
      message: 11,
      img: "https://img.hankyung.com/photo/202001/BF.21480816.1.jpg",
    },
    {
      name: "신종민",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.29", // 파싱 생각해보기
      category: "진로고민",
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      likeCount: 4,
      message: 13,
      img: "https://image.xportsnews.com/contents/images/upload/article/2021/1125/mb_1637825577788244.jpg",
    },
    {
      name: "한재준",
      age: "고2", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.28", // 파싱 생각해보기
      category: "진로고민",
      content:
        "수능 최저2 합4를 맞춰야 합니다. 영어랑 생윤을 준비중인데 하나 더 공부를 하려구요. 단기간 공부하기에 어떤 게 좋을까요?",
      likeCount: 21,
      message: 7,
      img: "https://file.mk.co.kr/meet/neds/2021/11/image_readtop_2021_1097541_16378776624856653.jpg",
    },
    {
      name: "아무개",
      age: "고1", //나중에 나이 숫자로 주면 파싱 생각해보기
      date: "2023.07.27", // 파싱 생각해보기
      category: "진로고민",
      content:
        "희망하는 과가 부모님 생각과 달라서 트러블이 생기는데 어떻게 하면 좋을까요. 부모님을 설득해야 하는데 설득할 자신이 없어요. 제가 좋아하는 과를 가는 게 맞을까요? 아니면 부모님 말씀처럼 유망한 과를 가는 게 맞을까요? 도와주세요 ㅠㅠㅠㅠ",
      likeCount: 5,
      message: 13,
      img: "",
    },
  ];
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        setSubMenu={setSubMenu}
        subMenuLinkList={subMenuLinkList}
      />
      <Outlet />
      {subMenu === subMenuList[0] && (
        <Form>
          <Section>
            <Search>
              <span>키워드 검색</span>
              <input type="text" className="search" />
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="glass-icon"
              />
            </Search>
            <Wrapper>
              <PostList posts={posts} postStyle="category" />
            </Wrapper>
            <UtilBox>
              <div className="util-item write" onClick={() => setIsWrite(true)}>
                <FontAwesomeIcon icon={faPencil} />
                <span>글쓰기</span>
              </div>
              <div className="util-item up" onClick={ScrollUp}>
                <FontAwesomeIcon icon={faChevronUp} />
                <span>위로</span>
              </div>
            </UtilBox>
          </Section>
        </Form>
      )}
    </>
  );
};

export default Community;

const Form = styled.div`
  height: 70%;
  display: flex;
  margin: 60px 0;
  justify-content: center;
  box-sizing: border-box;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  .header {
    margin: 50px 0;
    font-size: 2rem;
    font-weight: 600;
    color: #23354d;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 5rem;
  span {
    font-size: 1.7rem;
    font-weight: 600;
  }
  input {
    width: 30rem;
    height: 2.2rem;
    border: 1px solid black;
    border-radius: 3px;
  }
  .glass-icon {
    background-color: #2f5383;
    padding: 0.7rem 1rem;
    font-size: 1.2rem;
    color: white;
    border-radius: 5px;
  }
`;

const Wrapper = styled.div`
  width: 50rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
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
