import axios from "axios";
import { SV_LOCAL } from "../constants";
import { getCookie } from "../cookie";
import { useEffect, useState } from "react";

const useGetConsult = () => {
  const [lastUpcomingConsult, setLastUpcomingConsult] = useState([]);
  const [upcomingConsult, setUpcomingConsult] = useState([]);
  const [completedConsult, setCompletedConsult] = useState([]);

  useEffect(() => {
    const getConsult = async () => {
      try {
        const response = await axios.get(`${SV_LOCAL}/consultation/mentor`, {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        });
        setLastUpcomingConsult(response.data.object.lastUpcomingConsult);
        setUpcomingConsult(response.data.object.upcomingConsult);
        setCompletedConsult(response.data.object.previousConsult);
      } catch (e) {
        console.log(e);
      }
    };
    getConsult();
  }, []);

  return { lastUpcomingConsult, upcomingConsult, completedConsult };
};

export default useGetConsult;
