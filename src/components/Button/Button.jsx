import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/common/theme";

function Button({ children, size, weight, onClick, height }) {
  return (
    <StyledButton
      className={`Button ${size} ${weight}`}
      height={height}
      onClick={onClick}
    >
      {children}
    </StyledButton>
  );
}

Button.defaultProps = {
  size: "",
  weight: "regular",
};
export default Button;

const StyledButton = styled.button`
  background-color: ${colors.primaryBlue};
  border-radius: 5px;
  color: white;
  border: 1px solid #2f5383;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.5rem 2rem;
  cursor: pointer;
  height: ${(props) => (props.height ? `${props.height}` : "auto")};
  &.medium {
    width: 10rem;
  }
  &.large {
    width: 20rem;
  }
`;
