import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faPencil } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import CategoryList from "../../components/List/CategoryItem";
import { Link } from "react-router-dom";
import SubMenubar from "../../components/Menubar/SubMenubar";
import { CommunityMenu, CommunityMenuLinkList } from "../../settings/config";
import axios from "axios";
import { SV_LOCAL } from "../../constants";
import { getCookie } from "../../cookie";
import CategoryItem from "../../components/List/CategoryItem";

const Category = () => {
  const subMenuList = CommunityMenu;
  const subMenuLinkList = CommunityMenuLinkList;

  const ScrollUp = () => {
    if (!window.scrollY) return;
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    axios
      .get(`${SV_LOCAL}/community/article/count-by-category`, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.error(err));
  }, []);
  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[1]} // 카테고리
        subMenuLinkList={subMenuLinkList}
      />
      <Form>
        <Section>
          <div className="header">
            <span>게시글 카테고리</span>
          </div>
          <CategoryLayout>
            <CategoryItem />
          </CategoryLayout>
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
        </Section>
      </Form>
    </>
  );
};

export default Category;

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
