import React, { useEffect, useRef } from "react";
import SchoolItem from "./SchoolItem";
const SchoolList = ({ schoolList, setSchoolList, view }) => {
  const nextIdx = useRef(schoolList.length);
  const addSchoolItem = () => {
    const school = {
      idx: nextIdx.current,
      school: "고등학교",
      schoolName: "",
      startDate: new Date(),
      endDate: new Date(),
      state: "졸업",
    };
    setSchoolList([...schoolList, school]);
    nextIdx.current += 1;
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
