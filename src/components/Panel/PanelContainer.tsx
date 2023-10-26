import React from "react";
import { PanelProps } from "./Panel";
import { panelHeight } from "@/calendar/panels";
import { tsToMinutes } from "@/calendar/timestamps";
import { emptyEventLength } from "@/calendar/settings";

type PanelContainerProps = PanelProps & {
  children?: React.ReactNode;
};

const PanelContainer: React.FC<PanelContainerProps> = ({
  event,
  parentHeight,
  onClick,
  children,
}) => {
  const gridStyle = {
    height: `${panelHeight(event, parentHeight)}px`,
  };

  const isEven =
    Math.floor(tsToMinutes(event.start) / emptyEventLength) % 2 === 0;

  return (
    <div
      style={gridStyle}
      className={`text-sm w-30 break-all overflow-hidden`}
      onClick={() => onClick(event)}
    >
      {children}
    </div>
  );
};

export default PanelContainer;
