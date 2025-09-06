import { FC, useContext, useMemo } from "react";
import { CalendarContext } from ".";

interface CalendarBodyProps {
  className?: string;
  HeaderClassName?: string;
  selectDateClassName?: string;
  currentDateClassName?: string;
  currentMonthClassName?: string;
  calenderBtnClassName?: string;
  dateContainerClassName?: string;
}

const CalendarBody: FC<CalendarBodyProps> = (props) => {
  const {
    className,
    HeaderClassName,
    selectDateClassName,
    currentDateClassName,
    calenderBtnClassName,
    dateContainerClassName,
    currentMonthClassName,
  } = props;

  const { currentDate, handleSelectDate, selectDate } =
    useContext(CalendarContext);

  const year = selectDate.getFullYear(); // 현재 년도
  const month = selectDate.getMonth(); // 현재 월

  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

  // 해당 월의 1일과 마지막 날 계산
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // 달력에 표시할 시작일
  const startDate = new Date(
    firstDayOfMonth.getFullYear(),
    firstDayOfMonth.getMonth(),
    firstDayOfMonth.getDate() - firstDayOfMonth.getDay()
  );

  const lastDay =
    42 -
    firstDayOfMonth.getDay() -
    (lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()));

  // 마지막날
  const endDate = new Date(
    lastDayOfMonth.getFullYear(),
    lastDayOfMonth.getMonth(),
    lastDayOfMonth.getDate() + (6 - lastDayOfMonth.getDay()) + lastDay //시작날짜와 반대
  );

  // startDate부터 endDate까지 날짜 배열
  const calendar = [];

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    calendar.push(new Date(date)); // 새 날짜 객체를 배열에 추가
  }

  return (
    <div className={className}>
      <div className={HeaderClassName}>
        {daysOfWeek.map((day, index) => {
          return <div key={index}>{day}</div>;
        })}
      </div>
      <div className={dateContainerClassName}>
        {calendar.map((date, index) => {
          const isCurrentMonth = month === date.getMonth();
          const isCurrentDate =
            date.getFullYear() === currentDate.getFullYear() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getDate() === currentDate.getDate();
          const isSelectDate =
            date.getFullYear() === selectDate.getFullYear() &&
            date.getMonth() === selectDate.getMonth() &&
            date.getDate() === selectDate.getDate();

          return (
            <button
              key={`date-cell-${index}`}
              onClick={() => handleSelectDate(date)}
              className={`${calenderBtnClassName} ${
                !isCurrentMonth ? currentMonthClassName : ""
              }
              ${isCurrentDate ? currentDateClassName : ""} ${
                isSelectDate ? selectDateClassName : ""
              } `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarBody;
