import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { fetchUserInfo } from "../api/fetchUser";
import { useQuery } from "react-query";
import { Form } from "../styles/common/FoamComponents";
import TagList from "../components/List/TagList";
import ProfileImage from "../components/Image/ProfileImage";
import { yScrollStyle } from "../styles/common/Scroll";
import SchoolItem from "../components/List/SchoolItem";
import ReviewList from "../components/List/ReviewList";
import { FAQ, Review } from "../settings/config";
import FAQList from "../components/List/FAQList";
import { calculateAge } from "../utils/ParseFormat";
import BottomFixButton from "../components/Button/BottomFixButton";

const UserCard = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const userId = query.get("userId");
  const { isLoading, data: userData } = useQuery(
    userId,
    () => fetchUserInfo(userId),
    {
      refetchOnWindowFocus: false,
    }
  );
  console.log(userData);

  const univName = () => {
    const univ = userData.schoolList.filter(
      (school) => school.schoolType === "대학교"
    );
    const univName = univ.length > 0 ? univ[0].schoolName : "";
    const univMajor = univ.length > 0 ? univ[0].majorName : "";

    if (!!univName) {
      return (
        <div className="user-univ">
          {univName}대학교 {univMajor}
        </div>
      );
    }
    return null;
  };

  if (isLoading || !userData) {
    return <StyledLayout>loading...</StyledLayout>;
  } else
    return (
      <>
        <StyledLayout>
          <ProfileContainer>
            <NameWrapper>
              <div className="user-name">
                {userData.isTutor ? "멘토" : "멘티"} {userData.name} (
                {calculateAge(userData.birth)})
              </div>
              {univName()}
            </NameWrapper>
            <TagWrapper>
              {userData.consultMajor1 && <Tag>#{userData.consultMajor1}</Tag>}
              {userData.consultMajor2 && <Tag>#{userData.consultMajor2}</Tag>}
              {userData.consultMajor3 && <Tag>#{userData.consultMajor3}</Tag>}
            </TagWrapper>
            <ProfileImgWrapper>
              <ProfileImage
                profileImg={userData.profileImg}
                width="100%"
                height="100%"
              />
            </ProfileImgWrapper>
          </ProfileContainer>
          <CenterContainer>
            <div className="title">나를 간단히 소개한다면?</div>
            <TextBox>
              {userData.introduce ? userData.introduce : "소개글이 없습니다."}
            </TextBox>
          </CenterContainer>
          <CenterContainer>
            <div className="title">나의 라이프</div>
            <TextBox>
              {userData.introduce
                ? userData.introduce
                : "라이프 관련 글이 없습니다."}
            </TextBox>
          </CenterContainer>
          {userData.isTutor && userData.schoolList?.length > 0 && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 학력
              </div>
              {userData.schoolList.map((school, idx) => (
                <SchoolItem item={school} index={idx} view={true} />
              ))}
            </CenterContainer>
          )}
          {userData.isTutor && userData.schoolList?.length > 0 && (
            <CenterContainer>
              <div className="title">
                {userData.isTutor ? "멘토" : "멘티"}의 경력
              </div>
              {userData.schoolList.map((school, idx) => (
                <SchoolItem item={school} index={idx} view={true} />
              ))}
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">멘토가 받은 후기</div>
              <ReviewList review={Review} />
            </CenterContainer>
          )}
          {userData.isTutor && (
            <CenterContainer>
              <div className="title">대표 질문 FAQ</div>
              <FAQList FAQ={FAQ} />
            </CenterContainer>
          )}
        </StyledLayout>
        <BottomFixButton text="상담 신청하기" />
      </>
    );
};

export default UserCard;

const StyledLayout = styled.div`
  width: 80rem;
  max-width: 90vw;
  margin: 5rem auto 10rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const NameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 1.5rem;
  .user-name {
    font-size: 2rem;
    font-weight: 800;
  }
`;

const TagWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  gap: 1rem;
`;

const Tag = styled.div`
  height: 2rem;
  border: 1px solid #334b6c;
  border-radius: 13px;
  background-color: #334b6c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  padding: 0.5rem 0.8rem;
`;

const ProfileImgWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  justify-self: center;
`;

const TextBox = styled.div`
  width: 50rem;
  height: 10rem;
  border: 1px solid gray;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  ${yScrollStyle}
`;

const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  > .title {
    /* align-self: flex-start; */
    font-size: 1.6rem;
    font-weight: 600;
    margin-bottom: 1.5rem;
  }
`;
