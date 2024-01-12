import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFull } from "@fortawesome/free-solid-svg-icons";

const ReviewList = ({ review }) => {
  const scoreToStar = (score) => {
    const scoreList = [];
    for (var i = 0; i < Number(score); i++) {
      scoreList.push(<FontAwesomeIcon icon={faStarFull} />);
    }
    for (var j = 0; j < 5 - Number(score); j++) {
      scoreList.push(<FontAwesomeIcon icon={faStar} />);
    }
    return scoreList;
  };

  const averageScore = () => {
    var sum = 0;
    for (var i = 0; i < review.length; i++) {
      sum += review[i].score;
    }
    return Math.round((sum / review.length) * 10) / 10;
  };
  return (
    <ReviewTable>
      <tr>
        <th>총 리뷰: {review.length} 개 </th>
        <th></th>
        <th>평점 : {averageScore()}점</th>
      </tr>
      {review.map((item, i) => {
        return (
          <tr key={i}>
            <td>{item.content}</td>
            <td>
              {item.writer.substring(0, 1) + "*" + item.writer.substring(2)}
            </td>
            <td>{scoreToStar(item.score)}</td>
          </tr>
        );
      })}
    </ReviewTable>
  );
};

export default ReviewList;

const ReviewTable = styled.table`
  font-size: 1.1rem;
  width: 50rem;
  border-collapse: collapse;
  margin: 20px 0;
  td {
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    min-height: 2rem;
    padding: 10px 0;
  }
  th {
    text-align: start;
  }
  td:nth-child(1) {
    width: 60%;
  }
  td:nth-child(2) {
    width: 20%;
    text-align: center;
  }
  td:nth-child(3),
  th:nth-child(3) {
    width: 20%;
    text-align: center;
  }
`;
