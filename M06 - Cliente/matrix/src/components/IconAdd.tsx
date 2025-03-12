// IconAdd.tsx
import React from 'react';

// Definición de las propiedades para el componente IconAdd
interface IconAddProps {
  symbol: string;         // Símbolo que se mostrará en el icono
  onClick: () => void;    // Función a ejecutar al hacer clic en el icono
}

// Componente IconAdd: muestra un icono fijo que al hacer clic permite agregar un icono draggable en el tablero
const IconAdd: React.FC<IconAddProps> = ({ symbol, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        fontSize: '24px',      // Tamaño del icono
        cursor: 'pointer',     // Cambia el cursor para indicar que es clickeable
        userSelect: 'none'     // Previene la selección del texto
      }}
    >
      {symbol}
    </div>
  );
};

export default IconAdd;
