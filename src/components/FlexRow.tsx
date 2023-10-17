import React from "react";

type FlexRowProps = {
  children?: React.ReactNode;
  className?: string;
};

const FlexRow: React.FC<FlexRowProps> = ({ children, className }) => {
  return <div className={`flex flex-row h-full ${className}`}>{children}</div>;
};

export default FlexRow;
