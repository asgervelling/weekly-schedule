import React from 'react';

interface RowProps {
  n: number;
  colors: string[];
}

const Row: React.FC<RowProps> = ({ n, colors }) => {
  const containerStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${n}, 1fr)`,
    height: '100%',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      {colors.map((color, index) => (
        <div
          key={index}
          style={{ backgroundColor: color }}
          className=''
        />
      ))}
    </div>
  );
};

export default Row;
