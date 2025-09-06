import { FC, useContext } from "react";
import { CalendarContext } from ".";

interface CalendarNavigateProps {
  className?: string;
  nextLabel?: any;
}

const NextNavigator: FC<CalendarNavigateProps> = (props) => {
  const { className, nextLabel } = props;
  const { handleNext } = useContext(CalendarContext);

  return (
    <button className={className} onClick={handleNext}>
      {nextLabel ? nextLabel : "다음"}
    </button>
  );
};

export default NextNavigator;
