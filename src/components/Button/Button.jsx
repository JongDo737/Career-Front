import React from "react";
import styled from "styled-components";

function Button({ children, size, weight, onClick }) {
  return (
    <StyledButton className={`Button ${size} ${weight}`} onClick={onClick}>
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
  border-radius: 5px;
  color: white;
  border: 1px solid #2f5383;
  font-size: 1rem;
  font-weight: 600;
  height: 2.7rem;
  cursor: pointer;
  &.medium {
    width: 10rem;
  }
  &.large {
    width: 20rem;
  }
`;
