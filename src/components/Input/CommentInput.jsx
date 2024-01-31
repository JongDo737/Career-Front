import React from "react";
import styled from "styled-components";

const CommentInput = (props) => {
  const { inputValue, setInputValue, onEnter } = props;
  return (
    <StyledContainer>
      <input
        type="text"
        placeholder="여기에 댓글을 입력해주세요."
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <div className="reply-title">댓글쓰기</div>
      <div className="reply-option">
        <div className="reply-option__item" onClick={onEnter}>
          등록
        </div>
      </div>
    </StyledContainer>
  );
};

export default CommentInput;

const StyledContainer = styled.div`
  width: 100%;
  /* border: 1px solid black; */
  font-size: 1.2rem;
  position: relative;
  > input {
    width: 100%;
    padding: 4rem 3rem;
    box-sizing: border-box;
    font-size: 1.1rem;
    border: 1px solid gray;
    border-radius: 10px;
  }
  .reply-title {
    position: absolute;
    top: 1.5rem;
    left: 3rem;
    font-weight: 600;
  }
  .reply-option {
    display: flex;
    gap: 1rem;
    position: absolute;
    bottom: 1.2rem;
    right: 2rem;
    color: gray;
    font-weight: 600;
    &__item:hover {
      cursor: pointer;
      color: black;
    }
  }
`;
