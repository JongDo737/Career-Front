import styled from "styled-components";
import { MenteeHeader } from "../../styles/common/Mentee";
import {
  MenteeMentorLinkList,
  MenteeMentorMenu,
  TotalPopularMentors,
} from "../../settings/config";
import SubMenubar from "../../components/Menubar/SubMenubar";
import MentorCard from "../../components/List/MentorCard";

const PopularMentor = () => {
  const subMenuList = MenteeMentorMenu;
  const subMenuLinkList = MenteeMentorLinkList;

  return (
    <>
      <SubMenubar
        subMenuList={subMenuList}
        selectMenu={subMenuList[0]}
        subMenuLinkList={subMenuLinkList}
      />
      <StyledLayout>
        <MenteeHeader>이번주 인기 멘토</MenteeHeader>
        <GridContainer>
          {TotalPopularMentors.map((item, idx) => (
            <MentorCard key={idx} mentor={item} />
          ))}
        </GridContainer>
      </StyledLayout>
    </>
  );
};

export default PopularMentor;

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
