import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const modifyMentorProfile = async (changeObject) => {
  try {
    const formData = new FormData();
    const jsonData = { ...changeObject };
    formData.append("json", JSON.stringify(jsonData));
    const response = await axios.post(
      `${SV_LOCAL}/user/mentor/modify_profile`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
