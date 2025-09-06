import { FC, useContext } from "react";
import { CalendarContext } from ".";

interface CalendarNavigateProps {
  className?: string;
  prevLabel?: any;
}

const PrevNavigator: FC<CalendarNavigateProps> = (props) => {
  const { className, prevLabel } = props;
  const { handlePrev } = useContext(CalendarContext);

  return (
    <button className={className} onClick={handlePrev}>
      {prevLabel ? prevLabel : "이전"}
    </button>
  );
};

export default PrevNavigator;
