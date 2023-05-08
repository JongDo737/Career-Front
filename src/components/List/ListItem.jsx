import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Input/Input";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import * as dateFns from "date-fns";
const SchoolItem = ({ item, i, length, addSchoolList, removeSchoolList }) => {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <InputForm>
      <SchoolSelect
        name="school"
        onChange={(e) => {
          item.school = e.target.value;
          console.log(e.target.value);
        }}
      >
        <option name="school" value="고등학교">
          고등학교
        </option>
        <option name="school" value="대학교">
          대학교
        </option>
      </SchoolSelect>
      <Input
        placeholder="학교명"
        size="small"
        width="150px"
        onChange={(e) => {
          item.schoolName = e.target.value;
        }}
      />
      <DatePicker
        placeholderText="입학 날짜"
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect
        selected={startDate}
        onChange={(date) => {
          setStartDate(date);
        }}
        showMonthDropdown
        showYearDropdown
        showIcon
      />
      <div style={{ display: "flex", alignItems: "center" }}>~</div>
      <DatePicker
        selected={endDate}
        placeholderText="졸업 날짜"
        dateFormat="yyyy-MM-dd"
        minDate={startDate}
        shouldCloseOnSelect
        onChange={(date) => {
          setEndDate(date);
        }}
        showMonthDropdown
        showYearDropdown
        showIcon
      />

      <SchoolSelect
        name="school"
        onChange={(e) => {
          item.state = e.target.value;
        }}
      >
        <option name="school" value="졸업">
          졸업
        </option>
        <option name="school" value="졸업예정">
          졸업예정
        </option>
        <option name="school" value="재학">
          재학
        </option>
        <option name="school" value="휴학">
          휴학
        </option>
        <option name="school" value="자퇴">
          자퇴
        </option>
      </SchoolSelect>
      {i !== 0 ? (
        <AddRemoveIcon>
          <FontAwesomeIcon
            icon={faMinusCircle}
            onClick={() => {
              removeSchoolList(item.id);
            }}
          />
        </AddRemoveIcon>
      ) : (
        ""
      )}
      {i === length - 1 ? (
        <AddRemoveIcon>
          <FontAwesomeIcon icon={faPlusCircle} onClick={addSchoolList} />
        </AddRemoveIcon>
      ) : (
        ""
      )}
    </InputForm>
  );
};

export default SchoolItem;

const InputForm = styled.div`
  display: flex;
  min-width: 380px;
  justify-content: space-between;
  margin-bottom: 5px;
  gap: 10px;
`;
const SchoolSelect = styled.select`
  min-width: 120px;
  text-align: center;
`;

const AddRemoveIcon = styled.div`
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
