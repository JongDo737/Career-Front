import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";

const useGetConsult = () => {
  const [lastUpcomingConsult, setLastUpcomingConsult] = useState([]);
  const [upcomingConsult, setUpcomingConsult] = useState([]);
  const [previousConsult, setPreviousConsult] = useState([]);

  useEffect(() => {
    const getConsult = async () => {
      try {
        const response = await axios.get(`${SV_LOCAL}/consultation/mentor`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        });
        setLastUpcomingConsult(response.data.object.lastUpcomingConsult);
        setUpcomingConsult(response.data.object.lastUpcomingConsult);
        setPreviousConsult(response.data.object.previousConsult);
      } catch (e) {
        console.log("error");
        console.err(e);
      }
    };
    getConsult();
  }, []);

  return { lastUpcomingConsult, upcomingConsult, previousConsult };
};

export default useGetConsult;
