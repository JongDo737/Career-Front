import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const fetchPostDetail = async (id) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/community/article/detail`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
      params: {
        id: id,
      },
    });
  } catch (err) {
    console.err(err);
  }
};
