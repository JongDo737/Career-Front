import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../styles/big-calendar.css";
import styled from "styled-components";
import { SV_LOCAL } from "../constants";
import axios from "axios";
import { getCookie } from "../cookie";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 0,
      title: "Seongae test",
      allDay: false,
      start: new Date("2023-10-25T10:00"),
      end: new Date("2023-10-25T11:30"),
      reserve: true,
    },
    {
      id: 1,
      title: "Jongmin test",
      allDay: false,
      start: new Date("2023-10-26T10:30"),
      end: new Date("2023-10-26T12:30"),
      reserve: false,
    },
    {
      id: 2,
      title: "Jaejun test",
      allDay: false,
      start: new Date("2023-10-27T13:30"),
      end: new Date("2023-10-27T16:30"),
      reserve: true,
    },
    {
      id: 4,
      title: "heemun test",
      allDay: false,
      start: new Date("2023-10-24T10:00"),
      end: new Date("2023-10-24T11:30"),
      reserve: true,
    },
  ]);
  const [possibleTimeList, setPossibleTimeList] = useState([]);
  const [isUpdatePossibleTime, setIsUpdatePossibleTime] = useState(true);
  const today = moment();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState({
    start: "",
    end: "",
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const isCustomTimeCell = (start, end) => {
    let customStartTime = new Date();
    let customEndTime = new Date();
    let check = false;
    const today = new Date();
    // const beforeToday = start <= today.setMinutes(today.getMinutes() - 30);
    const beforeToday = start <= today;
    if (beforeToday) return null;
    else {
      possibleTimeList &&
        possibleTimeList.some((possibleTime) => {
          check = false;
          possibleTime.possibleTimeList.some((time) => {
            customStartTime = new Date(possibleTime.date + " " + time.start);
            customEndTime = new Date(possibleTime.date + " " + time.end);

            if (start >= customStartTime && start < customEndTime) {
              // 시간 범위안에 포함되면 true
              check = true;
              return true;
            }
            check = false;
            return false;
          });
          if (check) return true;
          else return false;
        });
      return check;
    }
  };

  const slotPropGetter = (date) => {
    const isSelected = isCustomTimeCell(date);
    const style = {
      backgroundColor: isSelected
        ? "yellow"
        : isSelected === null
        ? "#e1e1e1"
        : "white",
    };
    return { style };
  };

  const eventPropGetter = (event, start, end, isSelected, reserve) => {
    const isPastDate = moment(start).isBefore(today); // 오늘 이전인지 확인

    const style = {
      backgroundColor: isPastDate ? "lightgray" : "", // 오늘 이전인 경우 회색 배경, 그렇지 않으면 흰 배경
      borderColor: isPastDate ? "lightgray" : "",
      color: isPastDate ? "#3b3b3b" : "white",
    };

    if (!event.reserve) {
      style.opacity = "0.7";
      style.borderColor = "black";
      style.color = "black";
      style.borderStyle = "dashed";
    }

    style.class = event.reserve ? "reserved-event" : "regular-event";

    return { style };
  };

  const hideTimeSlots = (start, end) => {
    const hideStart = moment(start).hour() > 2 || moment(start).hour() <= 7;
    const hideEnd = moment(end).hour() > 2 || moment(end).hour() < 7;
    return hideStart || hideEnd;
  };

  useEffect(() => {
    if (isUpdatePossibleTime) {
      axios
        .post(
          `${SV_LOCAL}/calendar/mentor/get/possible/time`,
          {},
          {
            headers: {
              Authorization: `Bearer ${getCookie("jwtToken")}`,
            },
          }
        )
        .then((res) => {
          // console.log(res.data);
          if (res.data.dateList) setPossibleTimeList([...res.data.dateList]);
          setIsUpdatePossibleTime(false);
        })
        .catch((err) => console.log(err));
    }
  }, [isUpdatePossibleTime]);
  //   const handleSelectSlot = ({ start, end }) => {
  //     setIsAddModalOpen(true);
  //     setSelectedSlot({ start, end });
  //   };

  //   const handleCreateEvent = () => {
  //     const newEvent = {
  //       id: events.length + 1,
  //       title: `성애가 테스트중 ${events.length + 1}`,
  //       start: selectedSlot.start,
  //       end: selectedSlot.end,
  //       reserve: true,
  //     };
  //     setEvents([...events, newEvent]);
  //     setIsAddModalOpen(false);
  //     setSelectedSlot(null);
  //   };

  //   const handleCloseModal = () => {
  //     setIsAddModalOpen(false);
  //     setSelectedSlot(null);
  //   };

  //   const myDateHeader = ({ label, date }) => {
  //     return (
  //       <div>
  //         <button className="rbc-button-link" role="cell">
  //           {label}
  //         </button>
  //         <div>hi</div>
  //       </div>
  //     );
  //   };
  const handleSelectSlot = (date) => {
    const momentStart = moment(new Date(date.start));
    const momentEnd = moment(new Date(date.end));
    const formattedStartDate = momentStart.format("YYYY.MM.DD HH:mm");
    const formattedEndDate = momentEnd.format("YYYY.MM.DD HH:mm");

    setSelectedSlot({ start: formattedStartDate, end: formattedEndDate });
    const today = new Date();
    const beforeToday = date.start <= today;
    if (!beforeToday) setIsEditModalOpen(true);
    // slotPropGetter
    // const formattedStartDate = momentStart.format("YYYY-MM-DDTHH:mm:ss.S");
    // const formattedEndDate = momentEnd.format("YYYY-MM-DDTHH:mm:ss.S");

    // console.log(formattedStartDate);
    // console.log(formattedEndDate);
  };

  const onAddPossibleTime = () => {
    const formattedStartDate = moment(new Date(selectedSlot.start)).format(
      "YYYY-MM-DDTHH:mm:ss.S"
    );
    const formattedEndDate = moment(new Date(selectedSlot.end)).format(
      "YYYY-MM-DDTHH:mm:ss.S"
    );
    axios
      .post(
        `${SV_LOCAL}/calendar/mentor/insert/possible/time`,
        {
          start: formattedStartDate,
          end: formattedEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsUpdatePossibleTime(true);
      })
      .catch((err) => console.log(err));
  };

  const onDeletePossibleTime = () => {
    const formattedStartDate = moment(new Date(selectedSlot.start)).format(
      "YYYY-MM-DDTHH:mm:00.0"
    );
    const formattedEndDate = moment(new Date(selectedSlot.end)).format(
      "YYYY-MM-DDTHH:mm:00.0"
    );
    axios
      .post(
        `${SV_LOCAL}/calendar/mentor/delete/possible/time`,
        {
          start: formattedStartDate,
          end: formattedEndDate,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("jwtToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsUpdatePossibleTime(true);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        selectable
        defaultView="week"
        eventPropGetter={eventPropGetter}
        slotPropGetter={slotPropGetter}
        onSelectSlot={handleSelectSlot}
      />
      {isEditModalOpen && (
        <DeleteWrapper onClick={() => setIsEditModalOpen(false)}>
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <header>
              <span>{selectedSlot.start}</span>
              <span>~ {selectedSlot.end}</span>
            </header>
            <main>
              <div
                className="button"
                onClick={() => {
                  onDeletePossibleTime();
                  setIsEditModalOpen(false);
                }}
              >
                상담 시간 삭제하기
              </div>
              <div
                className="button"
                onClick={() => {
                  onAddPossibleTime();
                  setIsEditModalOpen(false);
                }}
              >
                상담 시간 추가하기
              </div>
            </main>
          </DeleteModal>
        </DeleteWrapper>
      )}
    </>
  );
};

export default MyCalendar;

const DeleteWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #8080806d;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const DeleteModal = styled.div`
  width: 15rem;
  background-color: white;
  padding: 2rem;
  border-radius: 1rem;
  > header {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.1rem;
    font-weight: 600;
  }
  > main {
    width: 100%;
    height: 5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    font-size: 1rem;
    font-weight: 500;
    .button {
      padding: 0.5rem 1.5rem;
      cursor: pointer;
      border-radius: 0.7rem;
      &:nth-of-type(1) {
        background-color: #f5f5f5;
        &:hover {
          background-color: #e9e9e9;
        }
      }
      &:nth-of-type(2) {
        background-color: #516a8b;
        color: white;
        &:hover {
          background-color: #2f5383;
        }
      }
    }
  }
`;
