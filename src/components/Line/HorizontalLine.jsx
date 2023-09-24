import React from "react";
import styled from "styled-components";

function HorizontalLine({ size, color, height }) {
  return <StyledHorizontal className={size} color={color} height={height} />;
}

HorizontalLine.defaultProps = {
  size: "large",
};

export default HorizontalLine;

const StyledHorizontal = styled.div`
  /* margin: 0 40px; */
  width: 100%;
  border: none;
  background-color: ${(props) => props.color || "#f4f4f4"};
  height: ${(props) => props.height || "3px"};
`;
