import React, { useState } from "react";
import "../../styles/calendar.css";
import styled from "styled-components";
import MenteeScheduleList from "../../components/List/MenteeScheduleList";
import MentorRecommendList from "../../components/List/MentorRecommendList";
import MenteeCalendar from "../../components/MenteeCalendar";

const MenteeSchedule = () => {
  const [target, setTarget] = useState(null); // 타겟 시간표. 디폴트는 본인

  return (
    <ScheduleLayout>
      <MenteeCalendar target={target} setTarget={setTarget} />
      <Right>
        <MenteeScheduleList />
        <MentorRecommendList target={target} setTarget={setTarget} />
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
