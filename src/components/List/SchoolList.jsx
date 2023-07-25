import React, { useRef } from "react";
import SchoolItem from "./SchoolItem";
const SchoolList = (props) => {
  const nextIdx = useRef(1);
  const addSchoolItem = () => {
    const school = {
      idx: nextIdx.current,
      school: "고등학교",
      schoolName: "",
      startDate: "",
      endDate: "",
      state: "졸업",
      majorList: [],
    };
    props.setSchoolList([...props.schoolList, school]);
    nextIdx.current += 1;
    console.log(props.schoolList);
  };
  const removeSchoolItem = (i) => {
    props.setSchoolList(props.schoolList.filter((a) => a.idx !== i));
  };

  return (
    <>
      {props.schoolList &&
        props.schoolList.map((item, i) => {
          return (
            <SchoolItem
              item={item}
              index={i}
              key={item.idx}
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
