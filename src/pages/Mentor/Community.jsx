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
import CommunityWrite from "../../components/CommunityWrite";

const Community = () => {
  const subMenuList = ["전체보기", "카테고리", "활동 내역"];
  const [subMenu, setSubMenu] = useState(subMenuList[0]);
  const [isWrite, setIsWrite] = useState(false);
  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    setIsWrite(false);
  }, [subMenu]);
  return (
    <>
      <SubMenubar subMenuList={subMenuList} setSubMenu={setSubMenu} />
      <Form>
        {subMenu === subMenuList[0] ? (
          !isWrite ? (
            <>
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
                  <PostList />
                </Wrapper>
                <UtilBox>
                  <div
                    className="util-item write"
                    onClick={() => setIsWrite(true)}
                  >
                    <FontAwesomeIcon icon={faPencil} />
                    <span>글쓰기</span>
                  </div>
                  <div className="util-item up" onClick={ScrollUp}>
                    <FontAwesomeIcon icon={faChevronUp} />
                    <span>위로</span>
                  </div>
                </UtilBox>
              </Section>
            </>
          ) : (
            <CommunityWrite setIsWrite={setIsWrite} />
          )
        ) : (
          ""
        )}
        {subMenu === subMenuList[1] ? (
          <>
            <Section>
              <div className="header">
                <span>게시글 카테고리</span>
              </div>
              <CategoryLayout>
                <CategoryList />
              </CategoryLayout>
              <UtilBox>
                <div
                  className="util-item write"
                  onClick={() => setIsWrite(true)}
                >
                  <FontAwesomeIcon icon={faPencil} />
                  <span>글쓰기</span>
                </div>
                <div className="util-item up" onClick={ScrollUp}>
                  <FontAwesomeIcon icon={faChevronUp} />
                  <span>위로</span>
                </div>
              </UtilBox>
            </Section>
          </>
        ) : (
          ""
        )}
      </Form>
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
  gap: 3rem;
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
