import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const fetchProfile = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/user/mentee/profile`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
