import React, { useState } from "react";
import SubMenubar from "../../components/Menubar/SubMenubar";

const CategoryPost = () => {
  const subMenuList = ["전체보기", "카테고리", "활동 내역"];
  const [subMenu, setSubMenu] = useState(subMenuList[1]);
  return (
    <div>
      <SubMenubar
        subMenu={subMenu}
        subMenuList={subMenuList}
        setSubMenu={setSubMenu}
      />
    </div>
  );
};

export default CategoryPost;
