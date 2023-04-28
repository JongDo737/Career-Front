import React from "react";
import styled from "styled-components";

function VerticalLine({ size }) {
  return <StyledVertical className={size} />;
}

VerticalLine.defaultProps = {
  size: "medium",
};

export default VerticalLine;

const StyledVertical = styled.div`
  background-color: #334b6c;
  width: 5px;
  &.small {
    height: 25px;
  }
  &.medium {
    height: 35px;
  }
`;
