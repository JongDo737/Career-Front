import moment from "moment/moment";
import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../styles/big-calendar.css";
import styled from "styled-components";

const localizer = momentLocalizer(moment);
const MyCalendar = () => {
  const event = [
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
  ];

  const today = moment();
  const eventPropGetter = (event, start, end, isSelected, reserve) => {
    const isPastDate = moment(start).isBefore(today, "day"); // 오늘 이전인지 확인

    const style = {
      backgroundColor: isPastDate ? "lightgray" : "", // 오늘 이전인 경우 회색 배경, 그렇지 않으면 흰 배경
      borderColor: isPastDate ? "lightgray" : "",
      color: isPastDate ? "#3b3b3b" : "white",
    };

    if (!event.reserve) {
      style.backgroundColor = "white";
      style.opacity = "0.7";
      style.borderColor = "black";
      style.color = "black";
      style.borderStyle = "dashed";
    }

    style.class = event.reserve ? "reserved-event" : "regular-event";

    return { style };
  };
  return (
    <>
      <Calendar
        localizer={localizer}
        events={event}
        startAccessor={"start"}
        endAccessor={"end"}
        selectable
        defaultView="week"
        eventPropGetter={eventPropGetter}
      />
    </>
  );
};

export default MyCalendar;
