import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";

export const modifyMentorProfile = async (changeObject, imageFile) => {
  try {
    const formData = new FormData();
    const jsonData = { ...changeObject };
    formData.append("json", JSON.stringify(jsonData));
    if (!!imageFile) formData.append("image", imageFile);
    const response = await axios.post(
      `${SV_LOCAL}/user/mentor/modify_profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};

export const modifyMenteeProfile = async (changeObject, imageFile) => {
  try {
    const formData = new FormData();
    const jsonData = { ...changeObject };
    formData.append("json", JSON.stringify(jsonData));
    if (!!imageFile) formData.append("image", imageFile);
    const response = await axios.post(
      `${SV_LOCAL}/user/mentee/modify_profile`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      }
    );
    return response;
  } catch (err) {
    console.error(err);
  }
};
