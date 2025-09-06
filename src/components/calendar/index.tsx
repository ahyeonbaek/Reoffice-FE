import {
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
  createContext,
} from "react";
import CalendarBody from "./CalendarBody";
import CalendarCurrent from "./CalendarCurrent";
import PrevNavigator from "./PrevNavigator";
import NextNavigator from "./NextNavigator";
import { instance } from "@/apis/axiosInterceptor";

interface CalendarComponentProps {
  Body: typeof CalendarBody;
  Current: typeof CalendarCurrent;
  PrevNavigator: typeof PrevNavigator;
  NextNavigator: typeof NextNavigator;
}

interface CalendarProps {
  onChange: (newDate: Date) => void;
  date: Date;
  className?: string;
}

interface CalendarContextProps {
  currentDate: Date;
  setCurrentDate: Dispatch<SetStateAction<Date>>;
  handleNext: () => void;
  handlePrev: () => void;
  handleSelectDate: (date: Date) => void;
  selectDate: Date;
  setSelectDate: Dispatch<SetStateAction<Date>>;
}

export const CalendarContext = createContext<CalendarContextProps>({
  currentDate: new Date(), //현재 날짜
  setCurrentDate: () => {},
  handleNext: () => {},
  handlePrev: () => {},
  handleSelectDate: () => {},
  selectDate: new Date(),
  setSelectDate: () => {},
});

interface CalendarProps extends PropsWithChildren {}
const Calendar: FC<CalendarProps> & CalendarComponentProps = (props) => {
  const { children, onChange, date, className } = props;
  const [currentDate, setCurrentDate] = useState<Date>(date); // 현재 날짜
  const [selectDate, setSelectDate] = useState<Date>(date); // 선택된 날짜

  const handleNext = () => {
    const newDate = new Date(selectDate);

    newDate.setMonth(newDate.getMonth() + 1); //다음 달로 설정
    setSelectDate(newDate);
    onChange(newDate);
  };

  const handlePrev = () => {
    const newDate = new Date(selectDate);

    newDate.setMonth(newDate.getMonth() - 1);
    setSelectDate(newDate);
    onChange(newDate);
  };

  const handleSelectDate = async (date: Date) => {
    setSelectDate(date);
    onChange(date);

    try {
      const response = await instance.get(`/reservation/?date=${date}`);
      if (response.status === 201) {
        console.log(response.data);
      }
    } catch (err) {}
  };

  return (
    <CalendarContext.Provider
      value={{
        currentDate,
        setCurrentDate,
        handleNext,
        handlePrev,
        handleSelectDate,
        selectDate,
        setSelectDate,
      }}
    >
      <div className={className}>{children}</div>
    </CalendarContext.Provider>
  );
};

Calendar.Body = CalendarBody;
Calendar.Current = CalendarCurrent;
Calendar.PrevNavigator = PrevNavigator;
Calendar.NextNavigator = NextNavigator;

export default Calendar;
