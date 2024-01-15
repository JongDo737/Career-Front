import React, { useRef } from "react";
import SchoolItem from "./SchoolItem";
const SchoolList = (props) => {
  const nextIdx = useRef(props.schoolList.length);
  const addSchoolItem = () => {
    const school = {
      id: nextIdx.current,
      school: "고등학교",
      schoolName: "",
      startDate: "",
      endDate: "",
      state: "졸업",
    };
    props.setSchoolList([...props.schoolList, school]);
    nextIdx.current += 1;
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
              view={props.view}
            />
          );
        })}
    </>
  );
};

export default SchoolList;

SchoolList.defaultProps = {
  view: false,
};
