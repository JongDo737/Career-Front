import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const onAddHeart = (type, id) => {
  axios
    .post(
      `${SV_LOCAL}/community/heart/add`,
      { typeId: id, type: type },
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    )
    // .then((res) => {
    //   setUpdatePost(true);
    // })
    .catch((err) => console.error(err));
};

export const onDeleteHeart = async (type, id) => {
  await axios
    .delete(
      `${SV_LOCAL}/community/heart/delete`,

      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },

        data: { typeId: id, type: type },
      }
    )
    .catch((err) => console.error(err));
};
