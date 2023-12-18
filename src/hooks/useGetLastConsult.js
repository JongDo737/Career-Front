import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";

const useGetLastConsult = () => {
  const [lastUpcomingConsult, setLastUpcomingConsult] = useState([]);

  useEffect(() => {
    const getConsult = async () => {
      try {
        const response = await axios.get(`${SV_LOCAL}/consultation/mentor`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        });
        setLastUpcomingConsult(response.data.object);
      } catch (e) {
        console.err(e);
      }
    };
    getConsult();
  }, []);

  return { lastUpcomingConsult };
};

export default useGetLastConsult;
