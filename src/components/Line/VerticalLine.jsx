import React from "react";
import styled from "styled-components";

function VerticalLine({ size, height }) {
  return <Line className={size} height={height} />;
}

VerticalLine.defaultProps = {
  size: "large",
};

export default VerticalLine;

const Line = styled.div`
  background-color: #bcbcbc;
  box-sizing: border-box;
  width: 1px;
  &.small {
    height: ${(props) => props.height || "20vh"};
  }
  &.medium {
    height: ${(props) => props.height || "50vh"};
  }
  &.large {
    height: ${(props) => props.height || "80vh"};
  }
`;
