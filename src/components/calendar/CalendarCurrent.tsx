import { FC, useContext } from "react";
import { CalendarContext } from "./index";

interface CalendarCurrentProps {
  className?: string;
}

const CalendarCurrent: FC<CalendarCurrentProps> = (props) => {
  const { className } = props;
  const { selectDate } = useContext(CalendarContext);

  const month = selectDate.getMonth();
  const year = selectDate.getFullYear();
  const day = selectDate.getDate();

  return (
    <div>
      <p className={className}>
        {year} - {month + 1} - {day}
      </p>
    </div>
  );
};

export default CalendarCurrent;
