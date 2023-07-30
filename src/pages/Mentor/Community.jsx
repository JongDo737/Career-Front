import React, { useState } from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faChevronUp,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import PostList from "../../components/List/PostList";

const Community = () => {
  const subMenuList = ["전체보기", "카테고리", "활동 내역"];
  const [subMenu, setSubMenu] = useState(subMenuList[0]);

  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };
  return (
    <>
      <SubMenubar subMenuList={subMenuList} setSubMenu={setSubMenu} />
      <Form>
        {subMenu === subMenuList[0] ? (
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
                <div className="write">
                  <FontAwesomeIcon icon={faPencil} />
                  <span>글쓰기</span>
                </div>
                <div className="up" onClick={ScrollUp}>
                  <FontAwesomeIcon icon={faChevronUp} />
                  <span>위로</span>
                </div>
              </UtilBox>
            </Section>
          </>
        ) : (
          ""
        )}
        {subMenu === subMenuList[1] ? <></> : ""}
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
    font-weight: 700;
    color: #23354d;
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
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid black;
    border-radius: 50%;
    padding: 0.7rem;
    font-size: 1rem;
    cursor: pointer;
  }
  .write {
    background-color: #eaeaea;
  }
  .up {
    background-color: #23354d;
    color: white;
  }
`;
