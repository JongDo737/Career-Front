import React, { useRef } from "react";
import SchoolItem from "./SchoolItem";
const SchoolList = (props) => {
  const nextId = useRef(1);
  const addSchoolItem = () => {
    const school = {
      id: nextId.current,
      school: "고등학교",
      schoolName: "",
      startDate: "",
      endDate: "",
      state: "졸업",
    };
    props.setSchoolList([...props.schoolList, school]);
    nextId.current += 1;
    console.log(props.schoolList);
  };
  const removeSchoolItem = (i) => {
    props.setSchoolList(props.schoolList.filter((a) => a.id !== i));
  };

  return (
    <>
      {props.schoolList &&
        props.schoolList.map((item, i) => {
          return (
            <SchoolItem
              item={item}
              index={i}
              key={item.id}
              length={props.schoolList.length}
              addSchoolItem={addSchoolItem}
              removeSchoolItem={removeSchoolItem}
            />
          );
        })}
    </>
  );
};

export default SchoolList;
