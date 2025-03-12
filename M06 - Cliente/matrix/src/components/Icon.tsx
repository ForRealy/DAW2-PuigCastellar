// Icon.tsx
import React from 'react';

// Definición de las propiedades que recibirá el componente Icon
interface IconProps {
  symbol: string; // Símbolo o carácter que representa el icono (ej. emoji o letra)
  draggable?: boolean; // Propiedad para habilitar o deshabilitar el arrastre (drag)
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void; // Función que se ejecuta al iniciar el arrastre
}

// Componente Icon: representa un icono que puede ser arrastrado y colocado en distintas casillas
const Icon: React.FC<IconProps> = ({ symbol, draggable = true, onDragStart }) => {
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      style={{
        fontSize: '24px',      // Tamaño del icono
        cursor: 'move',        // Cursor para indicar que el icono es movible
        userSelect: 'none'     // Evitar la selección del texto al arrastrar
      }}
    >
      {symbol}
    </div>
  );
};

export default Icon;
