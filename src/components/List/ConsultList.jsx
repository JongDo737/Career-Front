import React, { useState } from "react";
import styled from "styled-components";
import ConsultItem from "./ConsultItem";

const ConsultList = (props) => {
  const [moveIndex, setMoveIndex] = useState(0);
  const onMoveLeft = () => {
    if (moveIndex === 0) return;
    setMoveIndex((prev) => prev + 10);
  };
  const onMoveRight = () => {
    setMoveIndex((prev) => prev - 10);
  };
  return (
    <Div>
      <div className="left" onClick={onMoveLeft}></div>{" "}
      <Wrapper style={{ transform: `translateX(${moveIndex}%)` }}>
        {props.consultList.map((item, i) => {
          return (
            <ConsultItem
              color={props.color}
              item={item}
              index={i}
              key={item.id}
            />
          );
        })}
      </Wrapper>
      <div className="right" onClick={onMoveRight}></div>
    </Div>
  );
};

ConsultList.defaultProps = {
  color: "white",
};
export default ConsultList;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 20px;
  width: 100%;
`;

const Div = styled.div`
  .left,
  .right {
    height: 100%;
    width: 10%;
    position: absolute;
    z-index: 1;
    &:hover {
      background-color: rgba(0, 0, 0, 0.2);
    }
  }
  .right {
    right: 0;
    top: 0;
  }
`;
