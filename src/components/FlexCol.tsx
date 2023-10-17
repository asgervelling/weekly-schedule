import React from "react";

type FlexColProps = {
  children?: React.ReactNode;
  className?: string;
};

const FlexCol: React.FC<FlexColProps> = ({ children, className }) => {
  return <div className={`flex flex-col h-full ${className}`}>{children}</div>;
};

export default FlexCol;
