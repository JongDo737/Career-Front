import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const fetchMentorProfile = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/user/mentor/profile`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};

export const fetchMenteeProfile = async () => {
  try {
    const response = await axios.get(`${SV_LOCAL}/user/mentee/profile`, {
      headers: {
        Authorization: `Bearer ${getCookie("jwtToken")}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
