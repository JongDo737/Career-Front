import React from "react";
import styled from "styled-components";
import { TotalPopularMentors } from "../../settings/config";
import {
  MenteeHeader,
  MentorCardGrid,
  MentorDetailCardGrid,
} from "../../styles/common/Mentee";
import MentorDetailCard from "../../components/List/MentorDetailCard";

const ConsultMentor = () => {
  return (
    <StyledLayout>
      <MenteeHeader>상담 예정 멘토</MenteeHeader>
      <MentorDetailCardGrid>
        {TotalPopularMentors.map((item, idx) => (
          <MentorDetailCard key={idx} mentor={item} consult={true} />
        ))}
      </MentorDetailCardGrid>
    </StyledLayout>
  );
};

export default ConsultMentor;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  grid-template-rows: repeat(4, auto);
  grid-auto-rows: auto;
  gap: 2rem;
`;
