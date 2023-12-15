import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = () => {
  return <StyledSpinner></StyledSpinner>;
};

export default Spinner;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;
const StyledSpinner = styled.div`
  width: 2rem;
  height: 2rem;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #003558;
  border-radius: 50%;
  animation: ${rotate} 2s ease infinite;
`;
