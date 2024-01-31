import React, { useState } from "react";
import { getIdFromToken } from "../../auth/jwtFunctions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCookie } from "../../cookie";
import {
  faEllipsisVertical,
  faPencil,
} from "@fortawesome/free-solid-svg-icons";
import { faTrashCan, faFlag } from "@fortawesome/free-regular-svg-icons";
import DeleteCheckModal from "../Modal/DeleteCheckModal";
const OptionButton = (props) => {
  const {
    option,
    idx,
    activeOptionId,
    setActiveOptionId,
    setEditContent,
    inputRef,
    checkId,
    ids,
  } = props;
  const [isDeleteInfo, setIsDeleteInfo] = useState(false);

  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        className="post-option__btn"
        style={{ color: "black" }}
        onClick={() => {
          if (activeOptionId === idx) {
            setActiveOptionId(null);
          } else setActiveOptionId(idx);
        }}
      />
      {activeOptionId === idx &&
        (checkId === getIdFromToken(getCookie("jwtToken")) ? (
          <div className="post-options">
            <div
              className="post-options__item"
              onClick={() => {
                setEditContent(idx);
                setActiveOptionId(null);
                setTimeout(() => {
                  inputRef.current.focus();
                  const textLength = inputRef.current.value.length;
                  inputRef.current.setSelectionRange(textLength, textLength);
                }, 0);
              }}
            >
              <FontAwesomeIcon icon={faPencil} className="icon" />
              <span>편집</span>
            </div>
            <div
              className="post-options__item"
              onClick={() => {
                setActiveOptionId(null);
                setIsDeleteInfo(true);
              }}
            >
              <FontAwesomeIcon icon={faTrashCan} className="icon" />
              <span>삭제</span>
            </div>
          </div>
        ) : (
          <div className="post-options">
            <div
              className="post-options__item"
              onClick={() => {
                setActiveOptionId(null);
              }}
            >
              <FontAwesomeIcon icon={faFlag} className="icon" />
              <span>신고</span>
            </div>
          </div>
        ))}
      {isDeleteInfo && (
        <DeleteCheckModal
          isDeleteInfo={isDeleteInfo}
          setIsDeleteInfo={setIsDeleteInfo}
          option={option}
          ids={ids}
        />
      )}
    </>
  );
};

export default OptionButton;
