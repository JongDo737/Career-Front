import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "../styles/big-calendar.css";
import styled from "styled-components";
import { SV_LOCAL } from "../constants";
import axios from "axios";
import { getCookie } from "../cookie";
import { ButtonDiv } from "./Button/Button";

const localizer = momentLocalizer(moment);
const MenteeCalendar = (props) => {
  const { target, setTarget } = props;
  // state 0 이면 수락전, 1이면 수락완료-상담전, 2이면 상담완료
  const [events, setEvents] = useState([]);
  const [possibleTimeList, setPossibleTimeList] = useState([
    {
      possibleTimeList: [
        {
          start: "10:0",
          end: "18:0",
        },
      ],
      date: "2024-02-16",
    },
    {
      possibleTimeList: [
        {
          start: "14:0",
          end: "17:0",
        },
      ],
      date: "2024-02-17",
    },
    {
      possibleTimeList: [
        {
          start: "14:0",
          end: "17:0",
        },
      ],
      date: "2024-02-18",
    },
  ]);
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
      !!possibleTimeList &&
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

    var style = {
      backgroundColor: isSelected
        ? "#fff893"
        : isSelected === null
        ? "#dcdcdc98"
        : "white",
    };
    if (
      // 드래그할때
      new Date(date) >= new Date(selectedSlot.start) &&
      new Date(date) < new Date(selectedSlot.end)
    ) {
      if (!moment(selectedSlot.start).isBefore(today)) {
        style = { backgroundColor: "#526684", border: "none" };
      }
    }
    return { style };
  };

  const eventPropGetter = (event, start) => {
    const isPastDate = moment(start).isBefore(today); // 오늘 이전인지 확인

    const style = {
      backgroundColor: isPastDate ? "lightgray" : "", // 오늘 이전인 경우 회색 배경, 그렇지 않으면 흰 배경
      borderColor: isPastDate ? "lightgray" : "",
      color: isPastDate ? "#3b3b3b" : "white",
    };

    if (!event.status) {
      style.opacity = "0.8";
      style.borderColor = "white";
      style.color = "white";
      style.borderStyle = "dashed";
    }

    style.class = !event.status ? "reserved-event" : "regular-event";

    return { style };
  };

  useEffect(() => {
    let mentorId;
    if (!!target) mentorId = 57;
    else mentorId = null;
    axios
      .get(`${SV_LOCAL}/calendar/mentor/view`, {
        params: {
          mentorId: mentorId,
        },
        headers: {
          Authorization: `Bearer ${getCookie("jwtToken")}`,
        },
      })
      .then((res) => {
        const consultDataList = res.data.object;
        const tmpList = [...consultDataList.lastUpcomingConsult];
        tmpList.push(...consultDataList.previousConsult);
        tmpList.push(...consultDataList.upcomingConsult);
        const convertEvents = [];
        tmpList.forEach((item) =>
          convertEvents.push({
            ...item,
            id: item.consultId,
            title: item.student.nickname,
            start: new Date(item.startTime),
            end: new Date(item.endTime),
            status: item.status,
          })
        );
        const filteredEvents = convertEvents.filter(
          // 거절된 상담을 시간표에 표시되지 않도록 작업
          (event) => event.status !== 3
        );
        setEvents(filteredEvents);
      })
      .catch((err) => console.error(err));
  }, [target]);
  //   useEffect(() => {
  //     if (isUpdatePossibleTime) {
  //       axios
  //         .post(
  //           `${SV_LOCAL}/calendar/mentor/get/possible/time`,
  //           {},
  //           {
  //             headers: {
  //               Authorization: `Bearer ${getCookie("jwtToken")}`,
  //             },
  //           }
  //         )
  //         .then((res) => {
  //           if (res.data.dateList) setPossibleTimeList([...res.data.dateList]);
  //           setIsUpdatePossibleTime(false);
  //         })
  //         .catch((err) => console.error(err));
  //     }
  //   }, [isUpdatePossibleTime]);

  const handleSelectSlot = (date) => {
    const momentStart = moment(new Date(date.start));
    const momentEnd = moment(new Date(date.end));
    const formattedStartDate = momentStart.format("YYYY.MM.DD HH:mm");
    const formattedEndDate = momentEnd.format("YYYY.MM.DD HH:mm");

    setSelectedSlot({ start: formattedStartDate, end: formattedEndDate });
    const today = new Date();
    const beforeToday = date.start <= today;
    if (!beforeToday) setIsEditModalOpen(true);
  };

  const onApplyConsult = () => {
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
        setIsUpdatePossibleTime(true);
      })
      .catch((err) => console.error(err));
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
        setIsUpdatePossibleTime(true);
      })
      .catch((err) => console.error(err));
  };

  return (
    <CalendarContainer>
      <header>
        <div className="header-title">
          {!!target ? `${target.name} 멘토의 시간표` : "내 시간표"}
        </div>
        {!!target && (
          <ButtonDiv height="2rem" onClick={() => setTarget(null)}>
            내 시간표 보기
          </ButtonDiv>
        )}
      </header>
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
        min={new Date(0, 0, 0, 7, 0, 0)} // 표시할 최소 시간
        max={new Date(0, 0, 0, 23, 59, 59)} // 표시할 최대 시간
        step={30}
      />
      {isEditModalOpen && (
        <DeleteWrapper
          onClick={() => {
            setIsEditModalOpen(false);
            setSelectedSlot({ start: "", end: "" });
          }}
        >
          <DeleteModal onClick={(e) => e.stopPropagation()}>
            <header>
              <span>{selectedSlot.start}</span>
              <span>~ {selectedSlot.end}</span>
            </header>
            <main>
              <div
                className="button"
                onClick={() => {
                  onApplyConsult();
                  setIsEditModalOpen(false);
                  setSelectedSlot({ start: "", end: "" });
                }}
              >
                상담 신청하기
              </div>
            </main>
          </DeleteModal>
        </DeleteWrapper>
      )}
    </CalendarContainer>
  );
};

export default MenteeCalendar;

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  .header-title {
    font-size: 1.3rem;
    font-weight: 600;
    text-align: center;
    margin-bottom: 8px;
  }
`;
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
      background-color: #516a8b;
      color: white;
      &:hover {
        background-color: #2f5383;
      }
    }
  }
`;
