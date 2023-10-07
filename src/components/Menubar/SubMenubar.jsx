import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const SubMenubar = ({ subMenuList, selectMenu, subMenuLinkList }) => {
  const [select, setSelect] = useState(subMenuList[0]);

  return (
    <SubMenu>
      {subMenuList.map((item, idx) => {
        return (
          <Link
            className={
              item === selectMenu ? "select submenu__item" : "submenu__item"
            }
            to={subMenuLinkList[idx]}
            key={idx}
          >
            {item}
          </Link>
        );
      })}
    </SubMenu>
  );
};

export default React.memo(SubMenubar);

const SubMenu = styled.div`
  max-height: 6vh;
  height: 4rem;
  border-bottom: 2px solid #f4f4f4;
  padding: 0 40px;
  display: flex;
  .select {
    color: #3b71b9;
    font-weight: 700;
    border-bottom: 3px solid #3b71b9;
  }
  .submenu__item {
    height: 100%;
    font-size: 1.3rem;
    padding: 0 20px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #23354d;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
`;

const SubMenuItem = styled.div`
  height: 100%;
  font-size: 1.3rem;
  padding: 0 20px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #23354d;
  font-weight: 500;
  cursor: pointer;
`;
