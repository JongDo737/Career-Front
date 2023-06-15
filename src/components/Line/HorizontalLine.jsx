import React from "react";
import styled from "styled-components";

function HorizontalLine({ size, color }) {
  return <StyledHorizontal className={size} color={color} />;
}

HorizontalLine.defaultProps = {
  size: "large",
};

export default HorizontalLine;

const StyledHorizontal = styled.div`
  /* margin: 0 40px; */
  border: none;
  background-color: ${(props) => props.color || "#f4f4f4"};
  height: 3px;
`;
