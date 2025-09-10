import { instance } from "@/apis/axiosInterceptor";
import Calendar from "@/components/calendar";
import { SetStateAction } from "react";

interface CalendarComponentProps {
  date: Date;
  setDate: React.Dispatch<SetStateAction<Date>>;
  meetingRoom: string;
}

const CalendarComponent = ({
  date,
  setDate,
  meetingRoom,
}: CalendarComponentProps) => {
  const today = new Date();
  const onChange = async (selectDate: Date) => {
    const monthOfDay = selectDate.toLocaleDateString();
    console.log("monthOfDay", monthOfDay, meetingRoom);
    try {
      setDate(selectDate);
      const response = await instance.get(
        `/reservation/?date=${monthOfDay}&roomId=${meetingRoom}`
      );
      if (response.status === 200) {
        console.log(response.data.data);
      }
    } catch (err) {
      console.error(err, "예약내역 불러오기 실패");
    }
  };

  const handleClickToday = async (day: Date) => {
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
            currentDateClassName="text-[#3071F5] "
            selectDateClassName="bg-blue-100"
          />
        </div>
      </Calendar>
    </div>
  );
};

export default CalendarComponent;
