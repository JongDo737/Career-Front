import React, { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
const MajorItem = ({
  item,
  index,
  length,
  addUnivMajorItem,
  removeUnivMajorItem,
  view,
}) => {
  const [unit, setUnit] = useState(item.unit || "");
  const [major, setMajor] = useState(item.major || "");
  return (
    <>
      <FontAwesomeIcon icon={faArrowRight} />
      <MajorSelect
        name="major"
        onChange={(e) => {
          item.unit = e.target.value;
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
          item.major = e.target.value;
          setMajor(e.target.value);
        }}
        disabled={view}
      />
      {view ? "" : <Button>등록</Button>}
      {(index !== 0) & !view ? (
        <Icon>
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={() => {
              removeUnivMajorItem(item.idx);
            }}
          />
        </Icon>
      ) : (
        ""
      )}
      {(index === length - 1) & !view ? (
        <Icon>
          <FontAwesomeIcon icon={faPlusCircle} onClick={addUnivMajorItem} />
        </Icon>
      ) : (
        ""
      )}
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
    height: 30px;
    cursor: pointer;
  }
`;
