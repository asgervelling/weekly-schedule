import React from "react";
import { PanelProps } from "./Panel";
import { panelHeight } from "@/calendar/panels";
import { tsToMinutes } from "@/calendar/timestamps";

type PanelContainerProps = PanelProps & {
  children?: React.ReactNode;
};

const PanelContainer: React.FC<PanelContainerProps> = ({
  event,
  parentHeight,
  children,
}) => {
  const gridStyle = {
    height: `${panelHeight(event, parentHeight)}px`,
  };

  const isEven = Math.floor(tsToMinutes(event.start) / 30) % 2 === 0;
  const backgroundColor = isEven ? "bg-fill" : "bg-fillLowContrast";

  return (
    <div
      style={gridStyle}
      className={`lg:text-base text-md hover:border-2 hover:border-stroke ${backgroundColor}`}
    >
      {children}
    </div>
  );
};

export default PanelContainer;
