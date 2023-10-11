"use client"
import React, { useState } from 'react';
import GridLayout, { Layout } from 'react-grid-layout';

interface GridItem extends Layout {
  title: string;
}

const Calendar: React.FC = () => {
  const [layout, setLayout] = useState<GridItem[]>([]);

  const handleDragStop = (newLayout: Layout[]) => {
    const gridItems: GridItem[] = newLayout.map((item) => ({
      ...item,
      title: 'Hej', // Set the title value according to your requirements
    }));
    setLayout(gridItems);
  };

  return (
    <GridLayout
      className="layout"
      cols={24}
      rowHeight={30}
      width={1200}
      onDragStop={handleDragStop}
    >
      {layout.map((item) => (
        <div key={item.i} data-grid={item}>
          <p>Title: {item.title}</p>
        </div>
      ))}
    </GridLayout>
  );
};

export default Calendar;
