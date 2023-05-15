import React, { useEffect, useRef } from "react";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
const CareerItem = ({
  item,
  index,
  length,
  addCareerItem,
  removeCareerItem,
}) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [content, setContent] = useState("");

  return (
    <>
      <Form>
        <Select
          name="career"
          onChange={(e) => {
            item.career = e.target.value;
            console.log(e.target.value);
          }}
        >
          <option name="career" value="교내활동">
            교내활동
          </option>
          <option name="career" value="교외활동">
            교외활동
          </option>
          <option name="career" value="인턴">
            인턴
          </option>
          <option name="career" value="프로젝트">
            프로젝트
          </option>
          <option name="career" value="기타">
            기타
          </option>
        </Select>
        <Input
          placeholder="활동명"
          size="small"
          width="150px"
          onChange={(e) => {
            item.careerName = e.target.value;
          }}
        />
        <DatePicker
          placeholderText="시작 날짜"
          dateFormat="yyyy-MM-dd"
          shouldCloseOnSelect
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            item.startDate = date;
          }}
          showMonthDropdown
          showYearDropdown
          showIcon
        />
        <div style={{ display: "flex", alignItems: "center" }}>~</div>
        <DatePicker
          selected={endDate}
          placeholderText="종료 날짜"
          dateFormat="yyyy-MM-dd"
          minDate={startDate}
          shouldCloseOnSelect
          onChange={(date) => {
            setEndDate(date);
            item.endDate = date;
          }}
          showMonthDropdown
          showYearDropdown
          showIcon
        />

        <Select
          name="state"
          onChange={(e) => {
            item.state = e.target.value;
          }}
        >
          <option name="state" value="수료">
            수료
          </option>
          <option name="state" value="재직">
            재직
          </option>
          <option name="state" value="퇴사">
            퇴사
          </option>
          <option name="state" value="완료">
            완료
          </option>
        </Select>
        {index !== 0 ? (
          <Icon>
            <FontAwesomeIcon
              icon={faMinusCircle}
              onClick={() => {
                removeCareerItem(item.id);
              }}
            />
          </Icon>
        ) : (
          ""
        )}
        {index === length - 1 ? (
          <Icon>
            <FontAwesomeIcon icon={faPlusCircle} onClick={addCareerItem} />
          </Icon>
        ) : (
          ""
        )}
      </Form>
      <InputForm>
        <div>
          <span>역할 및 활동내용</span>
          <Input
            width="40rem"
            height="7rem"
            placeholder="활동내용에 대해 작성해 주세요."
            onChange={(e) => {
              setContent(e.target.value);
            }}
          >
            {content}
          </Input>
        </div>
        <div>{content.length}/200자</div>
      </InputForm>
    </>
  );
};

export default CareerItem;

const Form = styled.div`
  display: flex;
  min-width: 380px;
  justify-content: space-between;
  margin-bottom: 5px;
  gap: 10px;
  height: 40px;
`;
const Select = styled.select`
  min-width: 9rem;
  text-align: center;
  background-color: #eaeaea;
  height: 35px;
`;

const InputForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 48rem;
  padding-left: 30px;
  margin: 20px 0;
  gap: 10px;
  & > div {
    display: flex;
    & > span {
      margin-right: 1rem;
    }
  }
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
