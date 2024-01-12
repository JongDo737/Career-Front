import React from "react";
import MenuLine from "../Line/MenuLine";
import styled from "styled-components";

const TitleWithBar = ({ size, title }) => {
  return (
    <StyledWrapper>
      <MenuLine size={size} />
      <span>{title}</span>
    </StyledWrapper>
  );
};

export default TitleWithBar;

const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 1.2rem;
  span {
    margin-left: 1.2rem;
  }
`;
