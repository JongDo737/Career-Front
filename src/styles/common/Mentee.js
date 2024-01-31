import styled from "styled-components";
import { colors } from "./Theme";
import { MentorCardSize, MentorDetailCardSize } from "./Size";

export const MenteeHeader = styled.div`
  margin: 3rem;
  font-size: 2rem;
  font-weight: 700;
  color: ${colors.primaryBlue};
`;

export const MentorCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, ${MentorCardSize.width});
  grid-template-rows: repeat(1, ${MentorCardSize.height});
  grid-auto-rows: ${MentorCardSize.height};
  gap: 2.5rem;
`;

export const MentorDetailCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, ${MentorDetailCardSize.width});
  grid-template-rows: auto;
  grid-auto-rows: auto;
  gap: 2.5rem;
`;
