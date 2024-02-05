import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const MajorItem = ({ majorName, majorUnit, view }) => {
  const [unit, setUnit] = useState(majorUnit || "");
  const [major, setMajor] = useState(majorName || "");
  return (
    <>
      <FontAwesomeIcon icon={faArrowRight} />
      <MajorSelect
        name="major"
        onChange={(e) => {
          majorUnit = e.target.value;
          setUnit(e.target.unit);
        }}
        value={unit}
        disabled={view}
      >
        <option value="주전공">주전공</option>
        <option value="부전공">부전공</option>
        <option value="복수전공">복수전공</option>
        <option value="다중전공">다중전공</option>
      </MajorSelect>
      <Input
        size="medium"
        placeholder="학과를 입력해 주세요."
        value={major}
        height="100%"
        onChange={(e) => {
          majorName = e.target.value;
          setMajor(e.target.value);
        }}
        disabled={view}
      />
    </>
  );
};

export default MajorItem;

const MajorSelect = styled.select`
  min-width: 120px;
  height: 100%;
  text-align: center;
  background-color: #eaeaea;
  font-size: 1rem;
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2f5383;
  height: 100%;
  svg {
    height: 2rem;
    cursor: pointer;
  }
`;
