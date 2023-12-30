import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";

const useGetUpcomingConsult = () => {
  const [upcomingConsult, setUpcomingConsult] = useState([]);

  useEffect(() => {
    const getConsult = async () => {
      try {
        const response = await axios.get(
          `${SV_LOCAL}/consultation/list-by-status?status=1`,
          {
            headers: {
              Authorization: `Bearer ${getCookie("jwtToken")}`,
            },
          }
        );
        setUpcomingConsult(response.data.object);
      } catch (e) {
        console.error(e);
      }
    };
    getConsult();
  }, []);

  return { upcomingConsult };
};

export default useGetUpcomingConsult;
