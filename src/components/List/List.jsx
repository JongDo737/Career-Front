import React, { useRef } from "react";
import SchoolItem from "./ListItem";
function SchoolList(props) {
  const nextId = useRef(1);
  const addSchoolList = () => {
    const schoolInput = {
      id: nextId.current,
      school: "고등학교",
      schoolName: "",
      startDate: "",
      endDate: "",
      state: "졸업",
    };
    props.setSchoolList([...props.schoolList, schoolInput]);
    nextId.current += 1;
  };
  const removeSchoolList = (i) => {
    props.setSchoolList(props.schoolList.filter((a) => a.id !== i));
  };

  return (
    <>
      {props.schoolList &&
        props.schoolList.map((item, i) => {
          return (
            <SchoolItem
              item={item}
              i={i}
              key={item.id}
              length={props.schoolList.length}
              addSchoolList={addSchoolList}
              removeSchoolList={removeSchoolList}
            />
          );
        })}
    </>
  );
}

export default SchoolList;
