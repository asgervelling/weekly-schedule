import React from "react";
import { PanelProps } from "./Panel";
import { panelHeight } from "@/calendar/panels";

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

  return (
    <div
      style={gridStyle}
      className="text-xs lg:text-base text-md even:bg-fill odd:bg-fillLowContrast"
    >
      {children}
    </div>
  );
};

export default PanelContainer;
