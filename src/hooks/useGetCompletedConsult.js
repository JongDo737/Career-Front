import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";

const useGetCompletedConsult = () => {
  const [completedConsult, setCompletedConsult] = useState([]);

  useEffect(() => {
    const getConsult = async () => {
      try {
        const response = await axios.get(
          `${SV_LOCAL}/consultation/list-by-status?status=2`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("jwtToken")}`,
            },
          }
        );
        setCompletedConsult(response.data.object);
      } catch (e) {
        console.log(e);
      }
    };
    getConsult();
  }, []);

  return { completedConsult };
};

export default useGetCompletedConsult;
