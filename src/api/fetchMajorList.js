import axios from "axios";
import { SV_LOCAL } from "../constants";

export const fetchMajorAutoComplete = async (keyword) => {
  try {
    const response = await axios.get(`${SV_LOCAL}/major/contains`, {
      params: {
        majorName: keyword,
      },
    });
    return response.data;
  } catch (err) {
    console.error(err);
  }
};
