import React from "react";
import styled from "styled-components";
function Input({ size, placeholder, type, height, width }) {
  return (
    <StyledInput
      className={size}
      placeholder={placeholder}
      type={type}
      height={height}
      width={width}
    />
  );
}

Input.defaultProps = {
  size: "medium",
  placeholder: "입력해 주세요.",
  type: "text",
};

export default Input;

const StyledInput = styled.input`
  text-align: center;
  box-sizing: border-box;
  font-size: 15px;
  border-radius: 2px;
  border: 1px solid gray;
  height: ${(props) => props.height || "35px"};
  &.small {
    width: ${(props) => props.width || "76px"};
  }
  &.medium {
    width: ${(props) => props.width || "250px"};
  }
  &.large {
    width: ${(props) => props.width || "350px"};
  }
`;
