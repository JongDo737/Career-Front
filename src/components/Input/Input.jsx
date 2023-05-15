import React from "react";
import styled from "styled-components";
function Input({ size, placeholder, type, height, width, onChange, value }) {
  return (
    <StyledInput
      className={size}
      placeholder={placeholder}
      type={type}
      height={height}
      width={width}
      value={value}
      onChange={(e) => {
        onChange(e);
      }}
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
  font-size: 15px;
  border-radius: 2px;
  border: 1px solid gray;
  box-sizing: border-box;
  padding: 0; //나중에 reset.scss or reset.css 로 만들기
  height: ${(props) => props.height || "2.5rem"};
  &.small {
    width: ${(props) => props.width || "6.25rem"};
  }
  &.medium {
    width: ${(props) => props.width || "20rem"};
  }
  &.large {
    width: ${(props) => props.width || "35rem"};
  }
`;
