import moment from "moment/moment";
import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../styles/big-calendar.css";
import styled from "styled-components";

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

  const today = moment();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const isCustomTimeCell = (start, end) => {
    // 특정 시간 범위를 지정 (예: 10:00부터 11:00까지)
    const customStartTime = new Date(2023, 10 - 1, 27, 10, 0);
    const customEndTime = new Date(2023, 10 - 1, 27, 11, 0);

    return start >= customStartTime && start < customEndTime;
  };

  const slotPropGetter = (date) => {
    const isSelected = isCustomTimeCell(date);
    const style = {
      backgroundColor: isSelected ? "yellow" : "white", // 특정 시간 범위에 해당하는 셀에 노란색 배경, 그 외에는 흰 배경
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
  return (
    <>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor={"start"}
        endAccessor={"end"}
        selectable
        // onSelectSlot={handleSelectSlot}
        defaultView="week"
        eventPropGetter={eventPropGetter}
        slotPropGetter={slotPropGetter}
        // components={{
        //   month: {
        //     dateHeader: myDateHeader,
        //   },
        //}}
      />
      {/* {isAddModalOpen && (
        <EventModalWrapper>
          <EventModal>
            <h2>Create New Event</h2>
            <p>
              Selected Slot: {selectedSlot.start.toString()} -
              {selectedSlot.end.toString()}
            </p>
            <button onClick={handleCreateEvent}>Create Event</button>
            <button onClick={handleCloseModal}>Cancel</button>
          </EventModal>
        </EventModalWrapper>
      )} */}
    </>
  );
};

export default MyCalendar;

// const EventModalWrapper = styled.div`
//   width: 100%;
//   height: 100vh;
//   background-color: #8080806d;
//   position: fixed;
//   top: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow: hidden;
// `;
// const EventModal = styled.div`
//   width: 20rem;
//   height: 10rem;
//   background-color: white;
//   padding: 2rem;
//   border-radius: 1rem;
// `;
