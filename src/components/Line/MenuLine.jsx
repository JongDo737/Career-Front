import React from "react";
import styled from "styled-components";

function MenuLine({ size }) {
  return <Line className={size} />;
}

MenuLine.defaultProps = {
  size: "medium",
};

export default MenuLine;

const Line = styled.div`
  background-color: #334b6c;
  width: 5px;
  &.small {
    height: 25px;
  }
  &.medium {
    height: 35px;
  }
`;
