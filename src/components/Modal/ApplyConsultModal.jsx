import React from "react";
import { ModalWrapper } from "../../styles/common/ModalComponent";
import styled from "styled-components";

const ApplyConsultModal = () => {
  return (
    <ModalWrapper>
      <ModalContainer onClick={(e) => e.stopPropagation()}></ModalContainer>
    </ModalWrapper>
  );
};

export default ApplyConsultModal;

const ModalContainer = styled.div`
  padding: 3rem;
`;
