import React from "react";
import styled from "styled-components";
import MentorCard from "../../components/List/MentorCard";
import { TotalPopularMentors } from "../../settings/config";
import { MenteeHeader } from "../../styles/common/Mentee";

const ConsultMentor = () => {
  return (
    <StyledLayout>
      <MenteeHeader>내가 찜한 멘토</MenteeHeader>
      <GridContainer>
        {TotalPopularMentors.map((item, idx) => (
          <MentorCard key={idx} mentor={item} />
        ))}
      </GridContainer>
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
  grid-template-columns: repeat(4, 20rem);
  grid-template-rows: repeat(4, 30rem);
  grid-auto-rows: 30rem;
  gap: 1rem;
`;
