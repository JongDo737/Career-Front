import React, { useEffect, useRef } from "react";
import SchoolItem from "./SchoolItem";
import { dateToStringParse } from "../../utils/ParseFormat";
const SchoolList = ({ schoolList, setSchoolList, view }) => {
  const nextSchoolIdx = useRef(schoolList.length ? schoolList.length : 1);
  const addSchoolItem = () => {
    const school = {
      idx: nextSchoolIdx.current,
      schoolType: "고등학교",
      schoolName: "",
      startDate: dateToStringParse(new Date()),
      endDate: dateToStringParse(new Date()),
      state: "졸업",
    };
    setSchoolList([...schoolList, school]);
    nextSchoolIdx.current += 1;
  };
  const removeSchoolItem = (i) => {
    setSchoolList(schoolList.filter((a) => a.idx !== i));
  };
  useEffect(() => {
    if (!schoolList.length) {
      addSchoolItem();
    }
  }, []);

  return (
    <>
      {schoolList &&
        schoolList.map((item, i) => {
          return (
            <SchoolItem
              item={item}
              index={i}
              key={item.idx}
              length={schoolList.length}
              addSchoolItem={addSchoolItem}
              removeSchoolItem={removeSchoolItem}
              view={view}
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
