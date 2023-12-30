import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";

const useGetCancelConsult = () => {
  const [cancelConsult, setCancelConsult] = useState([]);

  useEffect(() => {
    const getConsult = async () => {
      try {
        const response = await axios.get(
          `${SV_LOCAL}/consultation/list-by-status?status=3`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("jwtToken")}`,
            },
          }
        );
        setCancelConsult(response.data.object);
      } catch (e) {
        console.error(e);
      }
    };
    getConsult();
  }, []);

  return { cancelConsult };
};

export default useGetCancelConsult;
