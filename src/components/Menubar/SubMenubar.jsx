import React, { useState } from "react";
import styled from "styled-components";
const SubMenubar = ({ subMenuList, setSubMenu }) => {
  const [select, setSelect] = useState(subMenuList[0]);

  return (
    <SubMenu>
      {subMenuList.map((item, idx) => {
        return (
          <SubMenuItem
            className={item === select ? "select" : ""}
            onClick={() => {
              setSelect(item);
              setSubMenu(item);
            }}
            key={idx}
          >
            {item}
          </SubMenuItem>
        );
      })}
    </SubMenu>
  );
};

export default SubMenubar;

const SubMenu = styled.div`
  height: 6vh;
  min-height: 3rem;
  border-bottom: 2px solid #f4f4f4;
  padding: 0 40px;
  display: flex;
  .select {
    color: #3b71b9;
    font-weight: 700;
    border-bottom: 3px solid #3b71b9;
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
