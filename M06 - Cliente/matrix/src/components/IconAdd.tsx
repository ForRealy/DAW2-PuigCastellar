import React from 'react';

interface IconAddProps {
  symbol: string;         
  onClick: () => void;   
}

// Icono fijo para agregar nuevos elementos
const IconAdd: React.FC<IconAddProps> = ({ symbol, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        fontSize: '24px',      
        cursor: 'pointer',     
        userSelect: 'none'     
      }}
    >
      {symbol}
    </div>
  );
};

export default IconAdd;
