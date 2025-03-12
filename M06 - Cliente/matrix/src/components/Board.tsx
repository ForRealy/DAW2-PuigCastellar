// Board.tsx
import React, { useState } from "react";
import Cell from "./Cell";
import Icon from "./Icon";
import IconAdd from "./IconAdd";

// Dimensiones del tablero
const ROWS = 6;
const COLS = 6;

// Posiciones reservadas para los iconos fijos IconAdd (esquina superior izquierda e inferior derecha)
const ICON_ADD_POSITIONS: IconAddPosition[] = [
    { row: 0, col: 0, type: "A" },
    { row: ROWS - 1, col: COLS - 1, type: "B" },
  ];

interface IconAddPosition {
    row: number;
    col: number;
    type: "A" | "B"; // Explicitly type the 'type' property
  }
// Definición de la estructura de los iconos draggable, que incluyen su posición, tipo y fase
interface IconData {
  row: number;
  col: number;
  type: "A" | "B"; // Tipo del icono (A o B)
  phase: number; // Fase del icono (0, 1, etc.)
}

// Función para determinar el símbolo del icono según su fase y tipo
const getIconSymbol = (type: "A" | "B", phase: number): string => {
  if (type === "A") {
    return ["🌱", "🌿", "🌻", "🌸"][phase] || "🌸"; // Símbolos de tipo A
  } else {
    return ["🔋", "⚡", "🖥️", "💥"][phase] || "💥"; // Símbolos de tipo B
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

  // Al hacer clic en uno de los iconos fijos, se agrega un nuevo icono draggable del tipo correspondiente en una celda vacía aleatoria
  const handleIconAddClick = (type: "A" | "B") => {
    const emptyCell = findEmptyCell();
    if (emptyCell) {
      setDraggableIcons([...draggableIcons, { row: emptyCell.row, col: emptyCell.col, type, phase: 0 }]);
    } else {
      console.log("No hay celdas vacías disponibles");
    }
  };

  // Guarda el índice del icono arrastrado en el dataTransfer para identificarlo en el drop
  const handleIconDragStart = (index: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("iconIndex", index.toString());
  };

  // Permite que la celda reciba el drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  // Maneja el evento drop en una celda:
  // - Si la celda está vacía, mueve el icono arrastrado a esa posición.
  // - Si la celda ya contiene un icono del mismo tipo y fase, se fusionan (fase incrementada y se elimina el arrastrado).
  const handleDrop = (row: number, col: number) => (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const iconIndexStr = e.dataTransfer.getData("iconIndex");
    const draggedIndex = parseInt(iconIndexStr, 10);
    if (isNaN(draggedIndex) || draggedIndex < 0 || draggedIndex >= draggableIcons.length) {
      return;
    }

    // Buscamos si ya hay un icono draggable en la celda destino
    const targetIndex = draggableIcons.findIndex(icon => icon.row === row && icon.col === col);

    if (targetIndex !== -1 && targetIndex !== draggedIndex) {
      const draggedIcon = draggableIcons[draggedIndex];
      const targetIcon = draggableIcons[targetIndex];

      // Si ambos iconos son del mismo tipo y tienen la misma fase, se fusionan
      if (draggedIcon.type === targetIcon.type && draggedIcon.phase === targetIcon.phase) {
        setDraggableIcons(prev => {
          const newIcons = [...prev];
          // Incrementamos la fase del icono destino
          newIcons[targetIndex] = { ...newIcons[targetIndex], phase: newIcons[targetIndex].phase + 1 };
          // Eliminamos el icono arrastrado
          newIcons.splice(draggedIndex, 1);
          return newIcons;
        });
        return;
      }
      return;
    } else if (targetIndex === -1) {
      // Si la celda está vacía, movemos el icono arrastrado
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

      // Si la celda es una de las reservadas para IconAdd, mostramos el icono fijo correspondiente a su tipo
      const iconAddData = ICON_ADD_POSITIONS.find(pos => pos.row === row && pos.col === col);
      if (iconAddData) {
        cellContent = (
          <IconAdd symbol={iconAddData.type === "A" ? "🌱" : "🔋"} onClick={() => handleIconAddClick(iconAddData.type)} />
        );
      } else {
        // Verificamos si hay un icono draggable en la celda
        const iconIndex = draggableIcons.findIndex(icon => icon.row === row && icon.col === col);
        if (iconIndex !== -1) {
          const iconData = draggableIcons[iconIndex];
          cellContent = (
            <Icon
              symbol={getIconSymbol(iconData.type, iconData.phase)}
              onDragStart={handleIconDragStart(iconIndex)}
            />
          );
        }
      }

      rowCells.push(
        <Cell key={`${row}-${col}`} row={row} col={col} onDragOver={handleDragOver} onDrop={handleDrop(row, col)}>
          {cellContent}
        </Cell>
      );
    }
    boardCells.push(
      <div key={`row-${row}`} style={{ display: "flex" }}>
        {rowCells}
      </div>
    );
  }

  return <div>{boardCells}</div>;
};

export default Board;
