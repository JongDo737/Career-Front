import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../styles/common/Theme";
import { MentorCardSize } from "../../styles/common/Size";

const MentorCard = ({ mentor, rank }) => {
  const { image, name, age, school, state, tags } = mentor;
  return (
    <StyledContainer>
      {rank ? (
        <FontAwesomeIcon
          className="icon"
          icon={faCrown}
          style={{ color: "#ffec00" }}
        />
      ) : (
        ""
      )}
      <img alt="" src={image} />
      <div className="content">
        <header>
          {name} ({age})
        </header>
        <main>
          <span>{school}</span>
          <span>{state}</span>
        </main>
        <footer>
          {tags.map((tag, idx) => {
            return <span key={idx}>#{tag}</span>;
          })}
        </footer>
      </div>
    </StyledContainer>
  );
};

export default MentorCard;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: ${MentorCardSize.width};
  height: ${MentorCardSize.height};
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
  box-shadow: 1px 1px 10px ${colors.primaryBlue};
  .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 2rem;
    background-color: #00000061;
    padding: 10px;
    border-radius: 50%;
  }
  img {
    width: ${MentorCardSize.width};
    height: ${MentorCardSize.width};
    object-fit: cover;
    object-position: center;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    gap: 10px;
    text-align: center;
    font-size: 1.1rem;
    background-color: #f5f5f5;
    box-sizing: border-box;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    font-weight: 500;
    flex: 1;
    header {
      font-size: 1.3rem;
    }
    main {
      display: flex;
      flex-direction: column;
    }
    footer {
      display: flex;
      gap: 10px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: center;
    }
  }
`;
