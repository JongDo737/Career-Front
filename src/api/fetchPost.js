import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const fetchPostDetail = async (postId) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/community/article/detail`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        id: postId,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
