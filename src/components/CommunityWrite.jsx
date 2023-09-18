import React, { useState } from "react";
import styled from "styled-components";

const CommunityWrite = ({ setIsWrite }) => {
  const [files, setFiles] = useState([]);
  const onChangeFiles = (e) => {
    setFiles(Object.values(e.target.files));
  };
  const onDeleteFile = (fileName) => {
    setFiles(files.filter((file) => file !== fileName));
  };

  return (
    <WriteLayout>
      <div className="write-menu">게시글 작성하기</div>
      <WriteWrapper>
        <div className="write-header">
          <span className="write-header__title">제목</span>
          <input
            type="text"
            className="write-header__input"
            placeholder="제목을 작성해 주세요."
            required
          />
        </div>
        <div className="write-content">
          <textarea
            name="write-content__input"
            className="write-content__input"
            placeholder={`무슨 이야기를 나누고 싶으신가요? 가벼운 이야기부터 시작해 보세요!`}
            maxLength="500"
            required
          ></textarea>
          <div className="write-file">
            <input
              type="file"
              multiple
              className="write-file__input"
              onChange={(e) => onChangeFiles(e)}
            />
            <ul className="write-file__list">
              {files.map((file, idx) => (
                <li key={idx}>
                  {file.name}
                  <img
                    src="/svg/close-black.svg"
                    alt="close-button"
                    onClick={() => onDeleteFile(file)}
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </WriteWrapper>
      <UtilBox>
        <div className="util-item" onClick={() => setIsWrite(false)}>
          <img src="/svg/arrow-left.svg" alt="back-button" />
          <span>뒤로</span>
        </div>
      </UtilBox>
      <div className="write-submit">등록하기</div>
    </WriteLayout>
  );
};

export default React.memo(CommunityWrite);

const WriteLayout = styled.div`
  width: 60rem;
  /* height: 92vh; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3rem;
  .write-menu {
    font-size: 2rem;
    font-weight: 600;
    width: 100%;
    text-align: center;
  }
  .write-submit {
    width: 10rem;
    height: 3rem;
    margin: 0 auto;
    font-size: 1.4rem;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2f5383;
    color: white;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
      background-color: #516a8b;
    }
  }
`;
const WriteWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid gray;
  border-radius: 5px;
  overflow: hidden;
  .write-header {
    height: 4rem;
    background-color: #2f5383;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    &__title {
      font-size: 1.7rem;
      font-weight: 500;
    }
    &__input {
      width: 60%;
      border: 1px solid gray;
      border-radius: 5px;
      padding: 0.5rem;
      box-sizing: border-box;
      font-size: 1.1rem;
      &::placeholder {
        text-align: center;
      }
    }
  }
  .write-content {
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 0;
    gap: 2rem;
    &__input {
      width: 90%;
      height: 25rem;
      border: 1px solid gray;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      font-size: 1.1rem;
      &::placeholder {
        text-align: center;
        line-height: 25rem;
      }
    }
  }
  .write-file {
    width: 90%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    &__input {
      font-size: 1.2rem;
    }
    &__list {
      list-style: none;
      padding: 0;
      display: flex;
      gap: 1rem;
      font-size: 1.2rem;
      li {
        display: flex;
        align-items: center;
        gap: 1rem;
        img {
          width: 1rem;
        }
      }
    }
  }
`;

const UtilBox = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 2rem;
  left: 3rem;
  .util-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    border: 1px solid black;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    padding: 0.7rem;
    font-size: 1rem;
    background-color: #23354d;
    color: white;
    font-weight: 600;
    cursor: pointer;
    img {
      width: 0.8rem;
    }
  }
`;
