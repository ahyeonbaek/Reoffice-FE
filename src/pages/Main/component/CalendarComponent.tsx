import Calendar from "@/components/calendar";
import { SetStateAction, useState } from "react";

interface CalendarComponentProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
}

const CalendarComponent = ({ date, setDate }: CalendarComponentProps) => {
  const today = new Date();
  const onChange = (select: Date) => {
    setDate(select);
  };

  const handleClickToday = (day: Date) => {
    setDate(day);
  };
  return (
    <div>
      <Calendar date={date} onChange={onChange}>
        <div className="flex items-center justify-start">
          <div className="flex items-center font-bold text-[20px]">
            <Calendar.PrevNavigator className="" prevLabel="＜" />
            <Calendar.Current className="" />
            <Calendar.NextNavigator className="" nextLabel="＞" />
          </div>
          <div>
            <button
              onClick={() => handleClickToday(today)}
              className="border p-1"
            >
              오늘
            </button>
          </div>
        </div>
        <div className="">
          <Calendar.Body
            className="flex flex-col width-[#280px] "
            HeaderClassName="grid grid-cols-[repeat(7,1fr)]  text-center bg-[#3071F5] text-white"
            dateContainerClassName="grid grid-cols-[repeat(7,1fr)]"
            calenderBtnClassName="min-w-[100px] w-full h-[100px] flex items-start justify-center "
            currentMonthClassName="text-[#cdcdcd]"
            currentDateClassName="bg-blue-100 "
          />
        </div>
      </Calendar>
    </div>
  );
};

export default CalendarComponent;
