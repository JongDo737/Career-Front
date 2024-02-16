import React from "react";
import "../styles/calendar.css";
import styled from "styled-components";
import MyCalendar from "../components/MyCalendar";
import ScheduleList from "../components/List/ScheduleList";

const Schedule = () => {
  return (
    <ScheduleLayout>
      <MyCalendar />
      <ScheduleList />
    </ScheduleLayout>
  );
};

export default Schedule;

const ScheduleLayout = styled.div`
  display: flex;
  gap: 5rem;
  margin: 60px auto;
  min-width: 70rem;
  min-height: 50rem;
  justify-content: center;
  box-sizing: border-box;
`;
