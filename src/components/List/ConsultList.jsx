import React, { useState } from "react";
import styled from "styled-components";
import ConsultItem from "./ConsultItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
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
      <div className="left" onClick={onMoveLeft}></div>
      <Wrapper style={{ transform: `translateX(${moveIndex}%)` }}>
        {props.consultList.map((item, i) => {
          return (
            <ConsultItem
              color={props.color}
              item={item}
              index={i}
              key={item.consultId}
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

export const ConsultListShort = (props) => {
  return (
    <ShortWrapper>
      <Table color={props.color}>
        <tr className="frame">
          <th className="num">No</th>
          <th className="name">학생 이름</th>
          <th className="date">날짜</th>
          <th className="time">시간</th>
          <th className="detail">더보기</th>
        </tr>
        {props.consultList.map((item, i) => {
          return (
            <tr>
              <td>{i}</td>
              <td>{item.name}</td>
              <td>
                {item.startTime.getFullYear()}.{item.startTime.getMonth()}.
                {item.startTime.getDate()}
              </td>
              <td>
                {item.startTime.getHours()}:{item.startTime.getMinutes()} ~
                {item.endTime.getHours()}:{item.endTime.getMinutes()}
              </td>
              <td>
                <FontAwesomeIcon icon={faAngleDown} />
              </td>
            </tr>
          );
        })}
      </Table>
      <Select>
        {/* show 방식은 api 호출로 pagination 이랑 같이 진행 -> 나중에 수정 */}
        <option value="5">show 5</option>
        <option value="10">show 10</option>
      </Select>
    </ShortWrapper>
  );
};

ConsultListShort.defaultProps = {
  color: "#23354d",
};

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

const Table = styled.table`
  width: 100%;
  font-size: 1.3rem;
  border-collapse: collapse;
  .frame {
    height: 3rem;
    color: ${(props) => (props.color === "#D9D9D9" ? "black" : "white")};
    background-color: ${(props) => props.color || "#23354d"};
  }
  tr {
    text-align: center;
    border: 1px solid #23354d;
  }
  td {
    height: 2.3rem;
    background-color: white;
  }
`;

const Select = styled.select`
  width: 6rem;
  font-size: 1rem;
  background-color: white;
  color: #23354d;
  padding: 5px;
  border: 1px solid #23354d;
`;

const ShortWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;
