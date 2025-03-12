// Board.tsx
import React, { useState } from 'react';
import Cell from './Cell';
import Icon from './Icon';
import IconAdd from './IconAdd';

// Dimensiones del tablero
const ROWS = 6;
const COLS = 6;

// Posiciones reservadas para los iconos fijos IconAdd (esquina superior izquierda e inferior derecha)
const ICON_ADD_POSITIONS = [
  { row: 0, col: 0 },
  { row: ROWS - 1, col: COLS - 1 }
];

// Definición de la estructura de los iconos draggable, que incluyen su posición y fase
interface IconData {
  row: number;
  col: number;
  phase: number; // Fase del icono (0, 1, etc.)
}

// Función para determinar el símbolo del icono según su fase
const getIconSymbol = (phase: number): string => {
  switch (phase) {
    case 0:
      return "⭐"; // Fase 0
    case 1:
      return "✨"; // Fase 1 (fusionado)
    default:
      return "🔥"; // Fases superiores
  }
};

const Board: React.FC = () => {
  // Estado para almacenar los iconos draggable presentes en el tablero
  const [draggableIcons, setDraggableIcons] = useState<IconData[]>([]);

  // Determina si una celda está vacía (excluyendo celdas reservadas y celdas ya ocupadas por iconos draggable)
  const isCellEmpty = (row: number, col: number): boolean => {
    const isReserved = ICON_ADD_POSITIONS.some(pos => pos.row === row && pos.col === col);
    if (isReserved) return false;
    const isOccupied = draggableIcons.some(icon => icon.row === row && icon.col === col);
    return !isOccupied;
  };

  // Busca todas las celdas vacías y devuelve una posición aleatoria entre ellas
  const findEmptyCell = (): { row: number; col: number } | null => {
    const availableCells: { row: number; col: number }[] = [];
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (isCellEmpty(row, col)) {
          availableCells.push({ row, col });
        }
      }
    }
    if (availableCells.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      return availableCells[randomIndex];
    }
    return null;
  };

  // Al hacer clic en alguno de los iconos fijos (IconAdd), se agrega un nuevo icono draggable en una celda vacía aleatoria
  const handleIconAddClick = () => {
    const emptyCell = findEmptyCell();
    if (emptyCell) {
      setDraggableIcons([...draggableIcons, { row: emptyCell.row, col: emptyCell.col, phase: 0 }]);
    } else {
      console.log("No hay celdas vacías disponibles");
    }
  };

  // Guarda el índice del icono arrastrado en el dataTransfer para identificarlo en el drop
  const handleIconDragStart = (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('iconIndex', index.toString());
  };

  // Permite que la celda reciba el drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Maneja el evento drop en una celda:
  // - Si la celda está vacía, mueve el icono arrastrado a esa posición.
  // - Si la celda ya contiene un icono draggable y ambos tienen la misma fase, se fusionan (fase incrementada y se elimina el arrastrado).
  const handleDrop = (row: number, col: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const iconIndexStr = e.dataTransfer.getData('iconIndex');
    const draggedIndex = parseInt(iconIndexStr, 10);
    if (isNaN(draggedIndex) || draggedIndex < 0 || draggedIndex >= draggableIcons.length) {
      return;
    }

    // Buscamos si ya hay un icono draggable en la celda destino
    const targetIndex = draggableIcons.findIndex(icon => icon.row === row && icon.col === col);

    if (targetIndex !== -1 && targetIndex !== draggedIndex) {
      const draggedIcon = draggableIcons[draggedIndex];
      const targetIcon = draggableIcons[targetIndex];
      // Si ambos iconos tienen la misma fase, se fusionan: el icono destino incrementa su fase
      if (draggedIcon.phase === targetIcon.phase) {
        setDraggableIcons(prev => {
          const newIcons = [...prev];
          // Actualizamos el icono destino con la nueva fase
          newIcons[targetIndex] = { ...newIcons[targetIndex], phase: newIcons[targetIndex].phase + 1 };
          // Eliminamos el icono arrastrado de la lista
          newIcons.splice(draggedIndex, 1);
          return newIcons;
        });
        return;
      }
      // Si no tienen la misma fase, no se realiza ningún cambio
      return;
    } else if (targetIndex === -1) {
      // Si la celda está vacía, simplemente movemos el icono arrastrado a la nueva posición
      setDraggableIcons(prev => {
        const newIcons = [...prev];
        newIcons[draggedIndex] = { ...newIcons[draggedIndex], row, col };
        return newIcons;
      });
    }
  };

  // Construcción del tablero celda por celda
  const boardCells = [];
  for (let row = 0; row < ROWS; row++) {
    const rowCells = [];
    for (let col = 0; col < COLS; col++) {
      let cellContent: React.ReactNode = null;

      // Si la celda es una de las reservadas para IconAdd, mostramos el icono fijo
      const isIconAddCell = ICON_ADD_POSITIONS.some(pos => pos.row === row && pos.col === col);
      if (isIconAddCell) {
        cellContent = (
          <IconAdd symbol="➕" onClick={handleIconAddClick} />
        );
      } else {
        // Verificamos si hay un icono draggable en la celda
        const iconIndex = draggableIcons.findIndex(icon => icon.row === row && icon.col === col);
        if (iconIndex !== -1) {
          const iconData = draggableIcons[iconIndex];
          cellContent = (
            <Icon
              symbol={getIconSymbol(iconData.phase)}
              onDragStart={handleIconDragStart(iconIndex)}
            />
          );
        }
      }

      rowCells.push(
        <Cell
          key={`${row}-${col}`}
          row={row}
          col={col}
          onDragOver={handleDragOver}
          onDrop={handleDrop(row, col)}
        >
          {cellContent}
        </Cell>
      );
    }
    boardCells.push(
      <div key={`row-${row}`} style={{ display: 'flex' }}>
        {rowCells}
      </div>
    );
  }

  return <div>{boardCells}</div>;
};

export default Board;
