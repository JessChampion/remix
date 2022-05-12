import React from "react";
import "./TimeFrameSelectorComponent.scss";
import { TEMPLATE_SEEDS } from "../../../templateStrings";

interface ITimeFrameSelectorComponentProps {
  onSelect: Function;
  currentTimeFrame?: TimeFrame;
  className?: string;
}

export const TIME_FRAME_OPTIONS = {
  longTerm: "long_term" as TimeFrame, // calculated from several years of data and including all new data as it becomes available
  mediumTerm: "medium_term" as TimeFrame, // (approximately last 6 months)
  shortTerm: "short_term" as TimeFrame, // (approximately last 4 weeks)
};

export const TIME_FRAME_DEFAULT = TIME_FRAME_OPTIONS.mediumTerm;
export const TIME_FRAME_DEFAULT_NUMBER = 2;

const timeFrameToNumber = (timeFrame: TimeFrame) => {
  if (timeFrame === TIME_FRAME_OPTIONS.longTerm) {
    return 3;
  }
  if (timeFrame === TIME_FRAME_OPTIONS.mediumTerm) {
    return 2;
  }
  return 1;
};

const numberToTimeFrame = (timeFrame: number) => {
  if (timeFrame === 3) {
    return TIME_FRAME_OPTIONS.longTerm;
  }
  if (timeFrame === 2) {
    return TIME_FRAME_OPTIONS.mediumTerm;
  }
  return TIME_FRAME_OPTIONS.shortTerm;
};

const getLabelForTimeFrame = (timeFrame: TimeFrame) => {
  if (timeFrame === TIME_FRAME_OPTIONS.longTerm) {
    return TEMPLATE_SEEDS.timeFrameLong;
  }
  if (timeFrame === TIME_FRAME_OPTIONS.mediumTerm) {
    return TEMPLATE_SEEDS.timeFrameMedium;
  }
  return TEMPLATE_SEEDS.timeFrameShort;
};

function TimeFrameSelectorComponent({
  onSelect,
  currentTimeFrame,
  className,
}: ITimeFrameSelectorComponentProps) {
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value;

    onSelect(
      numberToTimeFrame(
        parseInt(value, 10) || TIME_FRAME_DEFAULT_NUMBER
      ) as TimeFrame
    );
  };
  return (
    <div className={`time-frame-selector ${className}`}>
      <span className="time-frame-selector__label">
        {getLabelForTimeFrame(currentTimeFrame || TIME_FRAME_DEFAULT)}
      </span>
      <input
        className="time-frame-selector__input"
        type="range"
        max={3}
        min={1}
        defaultValue={timeFrameToNumber(currentTimeFrame || TIME_FRAME_DEFAULT)}
        onChange={onChange}
      />
    </div>
  );
}

TimeFrameSelectorComponent.defaultProps = {
  currentTimeFrame: TIME_FRAME_DEFAULT,
  className: "",
};

export default TimeFrameSelectorComponent;
