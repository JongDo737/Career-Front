import React from "react";
import styled from "styled-components";

function Button({ children, size, weight }) {
  return (
    <StyledButton className={`Button ${size} ${weight}`}>
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  size: "medium",
  weight: "regular",
};
export default Button;

const StyledButton = styled.button`
  background-color: #44638c;
  border-color: #2f5383;
  border-radius: 5px;
  color: white;
  border: none;
  font-size: 15px;
  font-weight: 600;
  height: 35px;
  cursor: pointer;
  &.medium {
    width: 120px;
  }
  &.large {
    width: 250px;
  }
`;
