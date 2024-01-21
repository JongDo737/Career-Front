import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
const Image = (props) => {
  const [image, setImage] = useState("");

  const onChangeImg = (e) => {
    if (e.target.files[0]) setImage(e.target.files[0]);
    else return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) setImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  const onResetImg = () => {
    setImage("");
  };
  const fileInput = useRef(null);

  return (
    <>
      {image === "" ? (
        <>
          <NoImage
            onClick={() => {
              fileInput.current.click();
            }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </NoImage>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onChangeImg}
            ref={fileInput}
            disabled={props.disabled || false}
          />
        </>
      ) : (
        <ActivityImgWrapper>
          <ActivityImg
            ActivityImg
            src={image}
            alt=""
            onClick={() => {
              fileInput.current.click();
            }}
          />

          <input
            style={{ display: "none" }}
            type="file"
            accept="image/jpg, image/jpeg, image/png"
            onChange={onChangeImg}
            ref={fileInput}
          />
          <FontAwesomeIcon
            icon={faXmark}
            className="icon-x"
            onClick={onResetImg}
          />
        </ActivityImgWrapper>
      )}
    </>
  );
};

export default Image;

const ActivityImgWrapper = styled.div`
  position: relative;
  .icon-x {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    padding: 0.5rem;
    font-size: 1rem;
    background-color: #000000df;
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;
const ActivityImg = styled.img`
  width: 8rem;
  height: 8rem;

  /* cursor: pointer; */
`;

const NoImage = styled.div`
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: gray;
  border: 1px solid gray;
  font-size: 3rem;
  cursor: pointer;
`;
