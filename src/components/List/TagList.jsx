import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Input from "../Input/Input";
import { InputForm } from "../../styles/common/FoamComponents";
import Button from "../Button/Button";

const TagList = ({ tagList, view }) => {
  const [tmpTag, setTmpTag] = useState("");
  const [tag, setTag] = useState([...tagList]);
  const tagId = useRef(tag.length - 1);
  const onUpdateTag = (value) => {
    setTag((current) => [...current, { id: tagId.current, name: value }]);
    tagId.current += 1;
  };
  const onDeleteTag = (id) => {
    setTag(tag.filter((a) => a.id !== id));
  };
  useEffect(() => {
    setTmpTag("");
  });

  return (
    <>
      <InputForm>
        <Input
          width="15rem"
          placeholder="태그명"
          onChange={(e) => {
            setTmpTag(e.target.value);
          }}
          disabled={view}
        />
        {!view && (
          <Button
            height="3rem"
            onClick={() => {
              onUpdateTag(tmpTag);
            }}
          >
            추가
          </Button>
        )}
      </InputForm>
      <TagWrapper>
        {tag.length
          ? tag.map((item) => {
              return (
                <Tag key={item.id}>
                  <span className="full-name">{item.name}</span>
                  <span className="short-name">#{item.name}</span>
                  {!view && (
                    <FontAwesomeIcon
                      onClick={() => onDeleteTag(item.id)}
                      className="delete-icon"
                      icon={faXmark}
                    />
                  )}
                </Tag>
              );
            })
          : ""}
      </TagWrapper>
    </>
  );
};

export default TagList;

const TagWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 2rem 0;
`;
const Tag = styled.div`
  width: 6rem;
  height: 2rem;
  border: 1px solid #334b6c;
  border-radius: 10px;
  background-color: #334b6c;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  padding: 0 0.5rem;
  position: relative;
  .short-name {
    width: 70%;
    margin-right: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
  }
  .full-name {
    /* visibility: hidden; */
    position: absolute;
    bottom: 2.2rem;
    color: black;
    background-color: #d5d5d5;
    visibility: hidden;
    padding: 0.2rem 0.5rem;
    border-radius: 10px;
    font-size: 0.8rem;
    text-align: center;
  }
  &:hover {
    .full-name {
      visibility: visible;
    }
  }
  .delete-icon {
    cursor: pointer;
  }
`;
