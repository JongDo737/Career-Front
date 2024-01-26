import styled from "styled-components";
import { MenteeHeader, MentorCardGrid } from "../../styles/common/Mentee";
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
        <MentorCardGrid>
          {TotalPopularMentors.map((item, idx) => (
            <MentorCard key={idx} mentor={item} />
          ))}
        </MentorCardGrid>
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
