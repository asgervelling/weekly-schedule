import React from "react";

type WeekProps = {
  children?: React.ReactNode;
};

const WeekContainer: React.FC<WeekProps> = ({ children }) => {
  return (
    <div className="flex w-full h-full overflow-y-auto border border-black rounded">
      {children}
    </div>
  );
};

export default WeekContainer;
