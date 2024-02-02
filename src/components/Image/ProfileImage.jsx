import React from "react";
import { DefaultImg } from "../../settings/config";
import styled from "styled-components";

const ProfileImage = ({ profileImg }) => {
  return (
    <ImageWrapper>
      <img src={profileImg || DefaultImg} alt="profile" />
    </ImageWrapper>
  );
};

export default ProfileImage;

const ImageWrapper = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  background-color: white;
  border-radius: 50%;
  border: 1px solid black;
  > img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
