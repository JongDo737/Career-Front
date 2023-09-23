import React, { useEffect } from "react";
import styled from "styled-components";

const ConsultItem = ({ color, item, index }) => {
  console.log(item);
  useEffect(() => {
    console.log(item);
  }, []);
  return (
    <Form color={color}>
      <div className="header">{item.student.nickname} 학생</div>
      <div className="main">
        <div className="time">
          {/* {item.startTime.getFullYear()}.{item.startTime.getMonth()}.
          {item.startTime.getDate()} {item.startTime.getHours()}:
          {item.startTime.getMinutes()} ~ {item.endTime.getFullYear()}.
          {item.endTime.getMonth()}. {item.endTime.getDate()}
          {item.endTime.getHours()}:{item.endTime.getMinutes()} 예정 */}
          {/* {item.startTime.replace("T", " ")} ~ {item.endTime.replace("T", " ")}{" "}
          예정 */}
        </div>
        <div className="major">
          <div>상담할 전공 : </div>
          <div className="majorName">{item.major}</div>
        </div>
        <div className="request">
          <div>요청 사항 :</div>
          {/* <div>{item.studentRequest.flow || "질문이 없습니다"}</div> */}
        </div>
      </div>
      <div className="footer">
        <div className="button">자세히 보기</div>
      </div>
    </Form>
  );
};

export default ConsultItem;

const Form = styled.div`
  background-color: ${(props) => props.color || "white"};
  border: 1px solid #23354d;
  border-radius: 10px;
  width: 28rem;
  min-height: 18rem;
  height: 100%;
  color: black;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  .header {
    height: 20%;
    font-size: 1.7rem;
    font-weight: 600;
  }
  .main {
    height: 55%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    font-size: 1.2rem;
    .time,
    .major,
    .request {
      display: flex;
      align-items: center;
      div:first-child {
        text-align: start;
        margin-right: 10px;
      }
      div:last-child {
      }
      .majorName {
        background-color: ${(props) =>
          props.color === "#D9D9D9" ? "#9D9D9D" : "" || "#23354d"};
        color: white;
        padding: 0.7rem;
        border-radius: 10px;
      }
    }
  }
  .footer {
    height: 25%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    .button {
      border: 1px solid #23354d;
      width: 40%;
      height: 70%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
`;
