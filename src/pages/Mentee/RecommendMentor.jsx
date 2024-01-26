import styled from "styled-components";
import { MenteeHeader, MentorCardGrid } from "../../styles/common/Mentee";
import {
  MenteeMentorLinkList,
  MenteeMentorMenu,
  TotalRecommendMentors,
} from "../../settings/config";
import SubMenubar from "../../components/Menubar/SubMenubar";
import MentorCard from "../../components/List/MentorCard";

const RecommendMentor = () => {
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
        <MenteeHeader>나만의 맞춤형 멘토</MenteeHeader>
        <MentorCardGrid>
          {TotalRecommendMentors.map((item, idx) => (
            <MentorCard key={idx} mentor={item} />
          ))}
        </MentorCardGrid>
      </StyledLayout>
    </>
  );
};

export default RecommendMentor;

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 3rem;
`;
