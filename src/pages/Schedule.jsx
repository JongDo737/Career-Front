import React, { useState } from "react";
import Calendar from "react-calendar";
import "../styles/calendar.css";
import styled from "styled-components";
import MyCalendar from "../components/MyCalendar";

const Schedule = () => {
  const [date, setDate] = useState(new Date());
  return (
    <Form>
      {/* <FormLeft>
        <Calendar
          onChange={(e) => {
            console.log(e);
            setDate(e);
          }}
          value={date}
        ></Calendar>
      </FormLeft> */}
      {/* <FormRight> */}
      <MyCalendar />
      {/* </FormRight> */}
    </Form>
  );
};

export default Schedule;

const Form = styled.div`
  display: flex;
  margin: 60px auto;
  min-width: 70rem;
  min-height: 50rem;
  justify-content: center;
  box-sizing: border-box;
`;

const FormLeft = styled.div`
  min-width: 17rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
  .menu-list {
    &__item {
      font-size: 1.4rem;
      padding: 0.8rem;
      border-bottom: 1px solid black;
      cursor: pointer;
    }
    &__item-selected,
    &__item:hover {
      background-color: #f4f4f4;
      font-weight: 600;
    }
  }
`;

const FormRight = styled.div`
  min-width: 50rem;
  max-width: 70rem;
  min-height: 73vh;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  border-left: 1px solid #bcbcbc;
`;
