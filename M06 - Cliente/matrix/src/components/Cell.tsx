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

// Componente Cell: representa una casilla del tablero que ahora acepta eventos de drop
const Cell: React.FC<CellProps> = ({ children, row, col, onDragOver, onDrop }) => {
  return (
    <div
      onDragOver={onDragOver} // Permite que la casilla sea destino de un drop
      onDrop={onDrop}         // Actualiza la posición del icono al soltarse
      style={{
        width: '50px',            // Ancho de la casilla
        height: '50px',           // Alto de la casilla
        border: '1px solid #000', // Borde para definir la casilla
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
