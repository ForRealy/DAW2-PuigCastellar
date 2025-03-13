// Cell.tsx
import React from 'react';

// Actualizamos las propiedades para incluir los manejadores de eventos de arrastre
interface CellProps {
  row: number;
  col: number;
  children?: React.ReactNode;
  onDragOver?: React.DragEventHandler<HTMLDivElement>;
  onDrop?: React.DragEventHandler<HTMLDivElement>;
}

// Componente básico para celdas del tablero
const Cell: React.FC<CellProps> = ({ children, row, col, onDragOver, onDrop }) => {
  return (
    <div
      onDragOver={onDragOver} 
      onDrop={onDrop}        
      style={{
        width: '50px',           
        height: '50px',          
        border: '1px solid #000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </div>
  );
};

export default Cell;
