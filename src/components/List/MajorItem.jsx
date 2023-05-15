import React from "react";
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
}) => {
  return (
    <>
      <FontAwesomeIcon icon={faArrowRight} />
      <MajorSelect
        name="major"
        onChange={(e) => {
          item.unit = e.target.value;
        }}
      >
        <option value="주전공">주전공</option>
        <option value="부전공">부전공</option>
        <option value="복수전공">복수전공</option>
        <option value="다중전공">다중전공</option>
      </MajorSelect>
      <Input
        size="medium"
        placeholder="학과를 입력해 주세요."
        onChange={(e) => {
          item.major = e.target.value;
        }}
      />
      <Button>등록</Button>
      {index !== 0 ? (
        <Icon>
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={() => {
              console.log("item ", item.id);
              removeUnivMajorItem(item.id);
            }}
          />
        </Icon>
      ) : (
        ""
      )}
      {index === length - 1 ? (
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
  height: 35px;
  text-align: center;
  background-color: #eaeaea;
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
