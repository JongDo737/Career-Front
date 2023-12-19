import React, { useState } from "react";
import styled from "styled-components";
import ConsultItem from "./ConsultItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { dateParse, dateTimeParse, timeParse } from "../../utils/dateParse";

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
      {/* <div className="left" onClick={onMoveLeft}></div> */}
      <Wrapper>
        {props.consultList.map((item, i) => {
          return (
            <ConsultItem
              color={props.color}
              item={item}
              index={i}
              key={item.consultId}
              type={props.type}
            />
          );
        })}
      </Wrapper>
      {/* <div className="right" onClick={onMoveRight}></div> */}
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
        {props.consultList.length ? (
          props.consultList.map((item, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{item?.student.nickname}</td>
                <td>
                  {dateParse(item.startTime)} ~ {dateParse(item.endTime)}
                </td>
                <td>
                  {timeParse(item.startTime)} ~ {timeParse(item.endTime)}
                </td>
                <td>
                  <FontAwesomeIcon icon={faAngleDown} />
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="5">상담 내역이 없습니다.</td>
          </tr>
        )}
      </Table>
      {/* <Select>
        // show 방식은 api 호출로 pagination 이랑 같이 진행 -> 나중에 수정 
        <option value="5">show 5</option>
        <option value="10">show 10</option>
      </Select> */}
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
  font-size: 1.2rem;
  border-collapse: collapse;
  .frame {
    /* height: 3rem; */
    color: ${(props) => (props.color === "#D9D9D9" ? "black" : "white")};
    background-color: ${(props) => props.color || "#23354d"};
  }
  th {
    padding: 0.5rem;
  }
  tr {
    border: 1px solid #23354d;
    padding: 1rem;
  }
  td {
    padding: 0.5rem;
    background-color: white;
    text-align: center;
  }
`;

const ShortWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  gap: 20px;
`;
