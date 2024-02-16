import React from "react";
import "../../styles/calendar.css";
import styled from "styled-components";
import MyCalendar from "../../components/MyCalendar";
import MenteeScheduleList from "../../components/List/MenteeScheduleList";
import MentorRecommendList from "../../components/List/MentorRecommendList";

const MenteeSchedule = () => {
  return (
    <ScheduleLayout>
      <MyCalendar />
      <Right>
        <MenteeScheduleList />
        <MentorRecommendList />
      </Right>
    </ScheduleLayout>
  );
};

export default MenteeSchedule;

const ScheduleLayout = styled.div`
  display: flex;
  gap: 5rem;
  margin: 60px auto;
  min-width: 70rem;
  min-height: 50rem;
  justify-content: center;
  box-sizing: border-box;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
