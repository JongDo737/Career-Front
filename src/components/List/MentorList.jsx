import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { xScrollStyle } from "../../styles/common/Scroll";
const MentorList = ({ mentors, rank }) => {
  return (
    <MentorContainer>
      {mentors.map((item, i) => {
        return (
          <MentorCard key={i}>
            {rank ? (
              <FontAwesomeIcon
                className="icon"
                icon={faCrown}
                style={{ color: "#ffec00" }}
              />
            ) : (
              ""
            )}

            <img alt="" src={item.image} />
            <div className="content">
              <header>
                {item.name} ({item.age})
              </header>
              <main>
                <span>{item.school}</span>
                <span>{item.state}</span>
              </main>
              <footer>
                {item.tags.map((tag, idx) => {
                  return <span key={idx}>#{tag}</span>;
                })}
              </footer>
            </div>
          </MentorCard>
        );
      })}
    </MentorContainer>
  );
};

export default MentorList;

const MentorContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  overflow: auto;
  ${xScrollStyle}
`;

const MentorCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 17rem;
  height: 28rem;
  border: 1px solid black;
  border-radius: 10px;
  position: relative;
  cursor: pointer;
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
    width: 17rem;
    height: 17rem;
    object-fit: cover;
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
    font-size: 1.2rem;
    height: 11rem;
    background-color: #f5f5f5;
    box-sizing: border-box;
    border-radius: 10px;
    font-weight: 500;
    header {
      font-size: 1.5rem;
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
